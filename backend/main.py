import requests
from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.environ.get("API_KEY")

app = FastAPI()




