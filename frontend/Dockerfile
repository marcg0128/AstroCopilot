# --- Base image
FROM node:18

# --- Arbeitsverzeichnis
WORKDIR /app

# --- package.json + lock kopieren
COPY package*.json ./

# --- Dependencies installieren
RUN npm install

# --- Projektdateien kopieren
COPY . .

# --- Build für Production
RUN npm run build

# --- Startbefehl
CMD ["npm", "start"]
