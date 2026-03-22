# 🧠 AI-Native News Experience

An AI-powered personalized news platform that transforms traditional business news into an **interactive, intelligent, and user-specific experience**.

> 🚀 Built to redefine how users consume news — not just reading, but understanding, visualizing, and interacting with it.

---

## ✨ Features

### 🎯 Personalized News Feed

* Tailored content for:

  * 🎓 Students
  * 📈 Investors
  * 🚀 Founders
* Intelligent filtering based on user context

---

### 🧠 AI-Powered Summaries

* Converts long articles into:

  * Concise 2-line summaries
  * 📌 “Why this matters” insights based on user type

---

### 🌍 Vernacular Translation

* Real-time translation into:

  * Tamil 🇮🇳
  * Hindi 🇮🇳
* Context-aware (not just literal translation)

---

### 🎥 AI News Video Studio

* Converts news into short videos
* Includes:

  * AI-generated narration
  * Visual frames
  * Auto-generated content

---

### ⚡ Modern UI/UX

* Dark theme with gradient background
* Smooth hover animations
* Card-based layout
* Responsive design

---

## 🏗️ Tech Stack

### Frontend

* React (Vite)
* Axios

### Backend

* FastAPI
* Python

### AI & Processing

* OpenAI API (summarization & translation)
* gTTS (text-to-speech)
* OpenCV (video generation)

### APIs

* NewsAPI / GNews

---

## 📁 Project Structure

```
ai-news-experience/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── services/
│   │   └── config.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── services/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 🔹 Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

### 🔹 Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file inside `backend/`:

```
OPENAI_API_KEY=your_openai_key
NEWS_API_KEY=your_news_api_key
```

---

## 🌐 Deployment

### Backend → Render

### Frontend → Vercel

Update API URL in frontend before deploying:

```js
const API = "https://your-backend-url.onrender.com";
```

---

## 🧠 Key Idea

> “This is not just a news app — it’s a personalized intelligence system that adapts news to the user.”

---

## 🚀 Future Enhancements

* 📊 Stock market integration
* 🎙️ Voice-controlled news
* 📱 Reel-style news feed
* 🧠 AI recommendation engine
* 👤 User authentication & saved preferences

---

## 👨‍💻 Author

**Naveen (NiceBunny)**

* Passionate about AI, UI/UX, and building impactful products

---

## ⭐ Show Your Support

If you like this project:

* ⭐ Star the repo
* 🍴 Fork it
* 🧠 Contribute ideas

---

## 📜 License

This project is open-source and available under the MIT License.

---
