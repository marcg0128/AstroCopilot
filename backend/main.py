import numpy as np

from satellites import satellitesData
from database import satellitesDatabase
from api_requests import nasaImages, eclipses

import fastapi
from fastapi.middleware.cors import CORSMiddleware

import uvicorn

db = satellitesDatabase.SatellitesDatabase()
app = fastapi.FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/satellites_preview")
def satellites_preview():

    norad_ids = [
        25544,  # ISS
        20580,  # Hubble
        48274,  # Tiangong
        39634,  # Sentinel-1A
        40697,  # Sentinel-2A
    ]

    data = db.get_satellites_data(norad_ids)

    if not data or len(data) < len(norad_ids):
        data = satellitesData.get_all_satellites_coordinates(norad_ids) # api call
        print(data)
        import json
        for norad_id, sat_data in data.items():

            db.update_satellite_data(
                norad_id,
                sat_data["name"],
                sat_data["lat"],
                sat_data["lon"],
                sat_data["height"],
                json.dumps(sat_data["path"])
            )


    return {
        "status": "success",
        "satellites": data
    }

@app.get("/nasa_image_of_the_day")
def nasa_image_of_the_day():

    data = nasaImages.get_nasa_image_of_the_day()
    print(data)
    return data

@app.get("/eclipses")
async def get_eclipses(year: int):
    data = eclipses.get_eclipses_for_year(year)
    return data


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
