# backend/main.py
import os
import requests
import datetime

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from dotenv import load_dotenv

app = FastAPI()
load_dotenv()

api_key = os.environ.get("API_KEY")
base_url = "https://api.nasa.gov/"


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/background")
async def get_background():
    r = requests.get(f"{base_url}planetary/apod?api_key={api_key}")
    data = r.json()

    return {"background": data["url"]}

@app.get("/lastthree")
async def get_lastthree():
    yesterday = datetime.date.today() - datetime.timedelta(days=1)
    three_days_before = datetime.date.today() - datetime.timedelta(days=3)

    params = {
        "api_key": api_key,
        "start_date": three_days_before,
        "end_date": yesterday
    }

    r = requests.get(f"{base_url}planetary/apod", params=params)

    data = r.json()

    return {"lastthree": [item for item in data]}




if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
