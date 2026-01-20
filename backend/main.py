from helper import satellitesData
import fastapi
from fastapi.middleware.cors import CORSMiddleware

import uvicorn


app = fastapi.FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/satellites_preview")
async def satellites_preview():

    norad_ids = [
        25544,  # ISS
        20580,  # Hubble
        48274,  # Tiangong
        39634,  # Sentinel-1A
        40697,  # Sentinel-2A
    ]

    data = satellitesData.get_all_satellites_coordinates(norad_ids)


    return {
        "status": "success",
        "satellites": [
            data
        ]
    }


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)


