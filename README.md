# 🌌 AstroCopilot

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Made with FastAPI](https://img.shields.io/badge/backend-FastAPI-green)](https://fastapi.tiangolo.com/)
[![Frontend Next.js](https://img.shields.io/badge/frontend-Next.js-black)](https://nextjs.org/)
[![HuggingFace Models](https://img.shields.io/badge/AI-HuggingFace-yellow)](https://huggingface.co/)
[![Docker Ready](https://img.shields.io/badge/deploy-Docker-blue)](https://www.docker.com/)

> **AstroCopilot** – An AI-powered space exploration assistant that combines **NASA/ESA data** with **HuggingFace AI models** to help you explore and understand the universe.

---

## ✨ Features

- 🛰️ **Image Intelligence** – Upload NASA/ESA telescope images → get AI captions, detected objects, and answers to questions.
- 🌍 **Interactive Space Globe** – Explore Earth and space data on a **3D interactive globe** with real-time satellite orbits, space events, and mission overlays.
- 🛰️ **Live Space Events** – Integration with **NASA EONET** & **APOD** for Earth and space event tracking.
- 📖 **Daily Space Digest** – AI-generated daily reports summarizing what’s happening in the cosmos.
//- 🎧 **Voice Narration** – Listen to reports with AI-powered text-to-speech.
//- 🕶️ **AR Exploration** – Point your phone to the sky and see constellations, planets, and AI explanations (WebXR).

---

## 🌐 Interactive Globe Capabilities

- Real-time **satellite tracking** (ISS, Starlink, Earth observation satellites)
- **NASA & ESA mission layers** (orbits, trajectories, observation zones)
- Live **Earth events** (fires, storms, volcanoes via EONET)
- Time-based playback to **rewind and predict orbital paths**
- Click any object for **AI-powered explanations**

---

## 🧠 HuggingFace Models Used

- **BLIP-2** → Image captioning & visual Q&A  
- **YOLOv8 / SAM** → Object detection  
- **T5 / BART** → Summarization  
- **MarianMT** → Translation  
- **Bark / TTS** → Voice narration  

---

## 🛠️ Tech Stack

**Frontend**: Next.js, Tailwind, Three.js / WebGL, WebXR  
**Backend**: FastAPI, Celery, Redis  
**Database**: PostgreSQL + Redis cache  
**Infra**: Docker, Docker Compose  
**External APIs**: NASA APOD, NASA EONET, ESA Gaia Archive, NASA 3D Models, Satellite TLE data  

---

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/username/astro-copilot.git
cd astro-copilot

# Start with Docker
docker-compose up --build
