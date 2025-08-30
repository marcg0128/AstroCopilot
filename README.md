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
- 🌍 **Live Space Events** – Integration with **NASA EONET** & **APOD** for Earth/space event tracking.
- 📖 **Daily Space Digest** – AI-generated daily reports summarizing what’s happening in the cosmos.
- 🎧 **Voice Narration** – Listen to reports with AI-powered text-to-speech.
- 🕶️ **AR Exploration** – Point your phone to the sky and see constellations, planets, and AI explanations (WebXR).

---

## 🧠 HuggingFace Models Used

- **BLIP-2** → Image captioning & visual Q&A  
- **YOLOv8 / SAM** → Object detection  
- **T5 / BART** → Summarization  
- **MarianMT** → Translation  
- **Bark / TTS** → Voice narration  

---

## 🛠️ Tech Stack

**Frontend**: Next.js/React, Tailwind, WebXR/Three.js  
**Backend**: FastAPI, Celery, Redis  
**Database**: -
**Infra**: Docker, Docker Compose  
**External APIs**: NASA APOD, NASA EONET, ESA Gaia Archive, NASA 3D Models  

---

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/username/astro-copilot.git
cd astro-copilot

# Start with Docker
docker-compose up --build
