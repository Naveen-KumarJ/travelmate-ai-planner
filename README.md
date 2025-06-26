# TravelMate AI Planner 🌍✈️

An AI-powered React application that helps you generate personalized travel itineraries using just a few inputs. Secure user authentication, trip creation, and history tracking included!

---

## 🚀 Features

- 🧠 Generate customized travel plans using Gemini AI API
- 🔐 Secure login and route protection (Firebase Auth)
- 📋 View and manage previously created trips
- 💾 Cloud storage of trips using Firebase Firestore
- 📱 Responsive UI built with Tailwind CSS

---

## 🛠️ Tech Stack

- **Frontend**: React, React Router, Tailwind CSS
- **Backend**: Firebase (Auth + Firestore)
- **AI**: Gemini API for trip generation
- **Notifications**: Sonner for elegant toasts

---

## 🧩 Installation

```bash
git clone https://github.com/your-username/travelmate-ai-planner.git
cd travelmate-ai-planner
npm install
npm run dev
````

---

## 🗝️ Environment Variables

Create a `.env` file in the root and include:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_UNSPLASH_API_KEY=your_unsplash_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

---

## 🧪 Scripts

| Command         | Purpose                |
| --------------- | ---------------------- |
| `npm run dev`   | Run development server |
| `npm run build` | Build for production   |

---

## 🔒 Protected Routes

All trip-related pages like `/create-trip`, `/my-trips`, and `/view-trip/:tripId` are wrapped in a `ProtectedRoute` component to ensure users are authenticated.

---


## 🙌 Acknowledgements

* [Firebase](https://firebase.google.com/)
* [Gemini API](https://ai.google.dev/)
* [React Router](https://reactrouter.com/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Sonner](https://sonner.emilkowal.ski/)

---
