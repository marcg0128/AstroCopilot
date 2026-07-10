const BASE_URL = "http://localhost:8000/";

export async function getPreviewSatellitesData() {
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

export async function getNasaImageOfTheDay() {
    try {
        const response = await fetch(BASE_URL + "nasa_image_of_the_day", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching NASA image of the day: ${response.statusText}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Failed to fetch NASA image of the day:', error);
        return null;
    }
}