const BASE_URL = "http://localhost:8000/";

export default async function getPreviewSatellitesData() {
    try {
        const response = await fetch(BASE_URL + "satellites_preview", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching satellite data: ${response.statusText}`);
        }

        const data = await response.json();

        return data.satellites;
    } catch (error) {
        console.error('Failed to fetch satellite data:', error);
        return null;
    }
}