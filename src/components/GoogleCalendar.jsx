import { useEffect, useState } from "react";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
const SCOPES = "https://www.googleapis.com/auth/calendar.events";
const GoogleCalendar = () => {
    const [gapiLoaded, setGapiLoaded] = useState(false);
    const [gisLoaded, setGisLoaded] = useState(false);
    const [tokenClient, setTokenClient] = useState(null);

    useEffect(() => {
        const loadGapi = () => {
            window.gapi.load("client", async () => {
                await window.gapi.client.init({
                    apiKey: API_KEY,
                    discoveryDocs: [DISCOVERY_DOC],
                });
                setGapiLoaded(true);
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
                        listUpcomingEvents();
                    }
                },
            });
            setTokenClient(client);
            setGisLoaded(true);
        };

        // Ensure the scripts are loaded before running these functions
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
            console.log("Upcoming Events:", response.result.items);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    return (
        <div>
            <h2>Google Calendar Integration</h2>
            <button onClick={handleAuthClick} disabled={!gapiLoaded || !gisLoaded}>
                Authorize with Google
            </button>
        </div>
    );
};

export default GoogleCalendar;
