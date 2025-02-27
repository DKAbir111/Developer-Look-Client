import { useEffect, useState } from "react";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

const useGoogleCalendar = () => {
    const [gapiLoaded, setGapiLoaded] = useState(false);
    const [gisLoaded, setGisLoaded] = useState(false);
    const [tokenClient, setTokenClient] = useState(null);
    const [events, setEvents] = useState({});
    const [taskMapping, setTaskMapping] = useState({});

    useEffect(() => {
        const loadGapi = () => {
            window.gapi.load("client", async () => {
                await window.gapi.client.init({
                    apiKey: API_KEY,
                    discoveryDocs: [DISCOVERY_DOC],
                });
                setGapiLoaded(true);

                const storedToken = localStorage.getItem("auth_token");
                if (storedToken) {
                    const token = JSON.parse(storedToken);
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
                        // console.log("Authorized successfully!");
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
    }, []);

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
            const eventsList = response.result.items;
            const taskEventMap = {};

            eventsList.forEach(event => {
                const eventId = event.id;
                const _id = event.extendedProperties?.private?.taskId;
                if (_id) {
                    taskEventMap[_id] = eventId;
                }
            });

            setEvents(eventsList);
            setTaskMapping(taskEventMap);
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
                description: `Description: ${task.description}\nStatus: ${task.status}\nPriority: ${task.priority}`,
                start: {
                    dateTime: new Date(task.dueDate).toISOString(),
                    timeZone: "Asia/Dhaka",
                },
                end: {
                    dateTime: new Date(new Date(task.dueDate).getTime() + 60 * 60 * 1000).toISOString(),
                    timeZone: "Asia/Dhaka",
                },
                extendedProperties: {
                    private: {
                        taskId: task._id,
                    },
                },
            };

            const response = await window.gapi.client.calendar.events.insert({
                calendarId: "primary",
                resource: event,
            });

            // console.log("Event created:", response.result);

            setTaskMapping(prev => ({ ...prev, [task._id]: response.result.id }));

            listUpcomingEvents();
            return response.result.id;
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };

    const updateEvent = async (task) => {
        const eventId = taskMapping[task._id];
        if (!eventId) {
            console.error(`No event found for task _id: ${task._id}`);
            return;
        }

        if (!gapiLoaded || !window.gapi.client.getToken()) {
            console.error("Google API not loaded or user not authenticated.");
            return;
        }

        try {
            // Fetch the existing event details
            const existingEvent = await window.gapi.client.calendar.events.get({
                calendarId: "primary",
                eventId: eventId,
            });

            if (!existingEvent.result) {
                console.error("Event not found.");
                return;
            }

            // Only update the status in the description
            const updatedDescription = existingEvent.result.description.replace(
                /Status: .*/,
                `Status: ${task.status}`
            );

            const updatedEvent = {
                ...existingEvent.result,
                description: updatedDescription,
            };

            const response = await window.gapi.client.calendar.events.update({
                calendarId: "primary",
                eventId: eventId,
                resource: updatedEvent,
            });

            console.log("Event updated:", response.result);
            listUpcomingEvents();
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };


    // Delete Event using _id
    const deleteEvent = async (_id) => {
        if (!gapiLoaded || !window.gapi.client.getToken()) {
            console.error("Google API not loaded or user not authenticated.");
            return;
        }

        const eventId = taskMapping[_id]; // Get the actual event ID from mapping
        if (!eventId) {
            console.error(`No event found for task _id: ${_id}`);
            return;
        }

        try {
            await window.gapi.client.calendar.events.delete({
                calendarId: "primary",
                eventId: eventId, // Use the actual event ID
            });

            // console.log("Event deleted successfully.");

            setTaskMapping(prev => {
                const updatedMapping = { ...prev };
                delete updatedMapping[_id];
                return updatedMapping;
            });

            listUpcomingEvents();
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };



    return {
        handleAuthClick,
        gapiLoaded,
        gisLoaded,
        events,
        addEvent,
        updateEvent,
        deleteEvent,
    };
};

export default useGoogleCalendar;
