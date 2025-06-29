# 🧠 AI Trip Planner 🌍✈️

An intelligent travel planning assistant powered by **Google Gemini** and built with the **MERN Stack**. Plan your trips effortlessly with AI-powered destination suggestions, hotel options, and custom itineraries — all through a beautiful, responsive UI.

---

## 🔥 Features

- 🌐 **AI-Powered Travel Planning** using Google Gemini API
- 🏨 Smart **Hotel & Location Recommendations**
- 📅 Dynamic **Itinerary Builder**
- 🧭 **Interactive Dashboard** with real-time suggestions
- 💬 Chat-based assistant interface
- 📍 Google Places Autocomplete for seamless location input
- 📦 **MERN Stack** (MongoDB, Express, React, Node.js)
- 🔐 JWT-based User Authentication
- 📈 Admin dashboard (optional for trip analytics)

---

## 🧰 Tech Stack

| Tech             | Description                     |
|------------------|----------------------------------|
| React            | Frontend UI                     |
| Node.js + Express| Backend API                     |
| MongoDB          | NoSQL database for trips/users  |
| Google Gemini    | AI engine for travel Q&A        |
| Firebase Auth    | (Optional) Google login         |
| Tailwind/ShadCN  | UI styling                      |
| OpenAI / Gemini  | Natural Language understanding  |

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js v18+
- MongoDB installed locally or on Atlas
- Google Gemini API key
- (Optional) Firebase Project

---

### ⚙️ Setup Instructions

```bash
# Clone the repo
git clone https://github.com/YourUsername/ai-trip-planner.git
cd ai-trip-planner

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Then edit `.env` to include your API keys, Mongo URI, etc.

# Run the server
npm run dev

