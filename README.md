# ⚡ AI Flow — MERN Stack AI Flowchart App

A full-stack MERN application that lets you interact with AI through an interactive flowchart interface. Built with **React Flow**, **OpenRouter (AI)**, **Express.js**, and **MongoDB**.

![AI Flow App](https://img.shields.io/badge/Stack-MERN-green) ![React Flow](https://img.shields.io/badge/React_Flow-11.x-blue) ![OpenRouter](https://img.shields.io/badge/AI-OpenRouter-orange)

---

## 🚀 Live Demo

- **Frontend:** https://your-frontend.onrender.com
- **Backend:** https://your-backend.onrender.com

---

## ✨ Features

- 🤖 **AI-powered responses** via OpenRouter (google free model)
- 🔗 **Interactive flowchart** with React Flow — two connected nodes
- 💾 **Save to MongoDB** — persist prompt & response to database
- 📋 **History panel** — view and reload all saved flows
- 🗑️ **Clear button** — reset both nodes instantly
- ⚡ **Animated edge** — pulses while AI is thinking
- 📝 **Markdown rendering** — AI responses render with proper formatting

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Flow, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| AI | OpenRouter API (google/gemma-3n-e4b-it:free) |
| Deployment | Render.com |

---

## 📁 Project Structure

```
AI-Flow-Chart/
├── backend/
│   ├── server.js
│   ├── database/db.js
│   ├── models/Flow.model.js
│   ├── controllers/flow.controller.js
│   ├── routes/flow.routes.js
│   ├── services/openrouter.service.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── index.css
    │   ├── main.jsx
    │   └── components/
    │       ├── InputNode.jsx
    │       └── ResultNode.jsx
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## ⚙️ How to Run Locally

### Prerequisites
- Node.js v22+
- MongoDB Atlas account (free)
- OpenRouter API key (free) — https://openrouter.ai/keys

---

### 1. Clone the repository

```bash
git clone https://github.com/pzee13/AI-Flow-Chart.git
cd AI-Flow-Chart
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=################
MONGO_URI=############################
OPENROUTER_API_KEY=######################
```

Start the backend:

```bash
npm start
```

Backend runs at: **http://localhost:5000**

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/`:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/ask-ai` | Send prompt → get AI response |
| `POST` | `/api/save` | Save prompt + response to MongoDB |
| `GET` | `/api/history` | Fetch last 20 saved flows |

---

## 🎯 How to Use

1. **Type** a prompt in the **Prompt Input** node
2. Click **▶ Run Flow** — AI response appears in the **AI Response** node
3. Click **💾 Save** — saves the conversation to MongoDB
4. Click **📋 History** — view all saved conversations
5. Click **Load →** on any history item to reload it into the flow
6. Click **🗑️ Clear** — resets both nodes

---

## 🌐 Deployment

Both deployed on **Render.com**:

**Backend → Web Service:**
| Key | Value |
|---|---|
| Root Directory | `backend` |
| Build Command | `npm install` |
| Start Command | `node server.js` |

**Frontend → Static Site:**
| Key | Value |
|---|---|
| Root Directory | `frontend` |
| Build Command | `npm install && npm run build` |
| Publish Directory | `dist` |

---

## 📄 License

MIT