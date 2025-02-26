import { useEffect, useState } from "react";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

const useGoogleCalendar = () => {
    const [gapiLoaded, setGapiLoaded] = useState(false);
    const [gisLoaded, setGisLoaded] = useState(false);
    const [tokenClient, setTokenClient] = useState(null);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const loadGapi = () => {
            window.gapi.load("client", async () => {
                await window.gapi.client.init({
                    apiKey: API_KEY,
                    discoveryDocs: [DISCOVERY_DOC],
                });
                setGapiLoaded(true);

                // Check if user is already authenticated on page load
                const storedToken = localStorage.getItem("auth_token");
                if (storedToken) {
                    const token = JSON.parse(storedToken);
                    // Set the token after client is initialized
                    window.gapi.client.setToken(token);
                    listUpcomingEvents();
                }
            });
        };

        const loadGis = () => {
            const client = window.google.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID,
                scope: SCOPES,
                callback: (response) => {
                    if (response.error) {
                        console.error("Authorization error:", response);
                    } else {
                        console.log("Authorized successfully!");
                        localStorage.setItem("auth_token", JSON.stringify(response));
                        listUpcomingEvents();
                    }
                },
            });
            setTokenClient(client);
            setGisLoaded(true);
        };

        if (window.gapi) loadGapi();
        if (window.google) loadGis();
    }, []); // Empty dependency array ensures this only runs once on mount

    const handleAuthClick = () => {
        if (!tokenClient) return;
        tokenClient.requestAccessToken();
    };

    const listUpcomingEvents = async () => {
        try {
            const response = await window.gapi.client.calendar.events.list({
                calendarId: "primary",
                timeMin: new Date().toISOString(),
                showDeleted: false,
                singleEvents: true,
                maxResults: 10,
                orderBy: "startTime",
            });
            setEvents(response.result.items);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const addEvent = async (task) => {
        if (!gapiLoaded || !window.gapi.client.getToken()) {
            console.error("Google API not loaded or user not authenticated.");
            return;
        }

        try {
            const event = {
                summary: task.title,
                description: task.description || "Task from To-Do App",
                start: {
                    dateTime: new Date(task.dueDate).toISOString(),
                    timeZone: "Asia/Dhaka", // Change to your relevant time zone
                },
                end: {
                    dateTime: new Date(new Date(task.dueDate).getTime() + 60 * 60 * 1000).toISOString(),
                    timeZone: "Asia/Dhaka",
                },
            };

            const response = await window.gapi.client.calendar.events.insert({
                calendarId: "primary",
                resource: event,
            });

            console.log("Event created:", response.result);
            listUpcomingEvents(); // Refresh event list
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };

    return {
        handleAuthClick,
        gapiLoaded,
        gisLoaded,
        events,
        addEvent,
    };
};

export default useGoogleCalendar;
