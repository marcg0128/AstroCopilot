# backend/main.py
import os
import requests

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
    print(data)
    if "url" in data:
        return {"background": data["url"]}


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
