# AI News Experience

AI News Experience is a full-stack app that turns general business headlines into a personalized AI briefing experience for different user types such as students, investors, and founders.

The project combines:
- A React + Vite frontend for the interactive newsroom UI
- A FastAPI backend for fetching and transforming news
- OpenAI-powered summarization and translation
- Video generation utilities for turning article summaries into simple shareable clips

## Overview

Instead of showing the same raw headlines to every user, this app adjusts the experience in three layers:

1. News ingestion
   Raw business news is fetched from NewsAPI.
2. Personalization
   Headlines are filtered by user profile keywords like `education`, `market`, or `startup`.
3. AI enhancement
   The selected articles are summarized, translated on demand, and can be turned into a simple generated video.

On the frontend, the user can:
- Switch between persona views
- Read AI-enhanced summaries
- Translate the summary
- Open a generated video from the summary
- Open the original article source

## Features

### Personalized news feed
- Supports `student`, `investor`, and `founder` personas
- Filters articles based on persona-specific keywords
- Falls back to the first few articles if no keyword match is found

### AI summaries
- Uses OpenAI to generate a short summary
- Adds a "Why this matters" angle based on the selected user type

### Translation
- Translates article summaries into another language
- The current frontend flow uses Tamil translation by default

### Video generation
- Creates a text-based video frame using OpenCV
- Generates speech audio using gTTS
- Returns an `.mp4` file response from the backend

### Frontend experience
- Responsive React UI
- Persona cards for switching context
- Loading, empty, and error states
- Styled article cards with translation and video actions

## Tech Stack

### Frontend
- React 18
- Vite 5
- Axios
- CSS

### Backend
- FastAPI
- Uvicorn
- Python

### AI and media
- OpenAI API
- gTTS
- OpenCV
- NumPy

### External data source
- NewsAPI

## Project Structure

This repository currently uses a root-level frontend and a separate `backend` folder:

```text
ai-news-experience/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── models/
│   │   │   └── user.py
│   │   ├── routes/
│   │   │   └── news.py
│   │   └── services/
│   │       ├── ai_service.py
│   │       ├── news_service.py
│   │       ├── personalization.py
│   │       └── video_service.py
│   └── requirements.txt
├── src/
│   ├── components/
│   │   ├── Feed.jsx
│   │   ├── NewsCard.jsx
│   │   └── ProfileSelector.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
└── README.md
```

## How It Works

### Backend flow

1. `GET /news?user_type=student`
   - Fetches top US business headlines from NewsAPI
   - Filters them based on the chosen persona
   - Generates an AI summary for each selected article
   - Returns a list of enriched articles

2. `GET /news/translate?text=...&lang=Tamil`
   - Uses OpenAI to translate text into the selected language
   - Falls back to the original text if translation fails

3. `GET /news/video?text=...`
   - Creates speech audio with gTTS
   - Builds a simple text-based video with OpenCV
   - Returns the generated `.mp4`

### Frontend flow

1. The app loads with `student` as the default persona.
2. The frontend calls the backend `/news` route.
3. The feed renders article cards with title, summary, and action buttons.
4. The user can:
   - Change persona
   - Request translation
   - Generate a video
   - Read the original article

## API Reference

### `GET /`
Health-style root endpoint.

Example response:

```json
{
  "message": "Running"
}
```

### `GET /news/`

Query parameters:
- `user_type`: `student | investor | founder`

Example:

```http
GET /news?user_type=founder
```

Example response shape:

```json
[
  {
    "title": "Startup funding rises in India",
    "description": "Demo news",
    "url": "https://example.com/article",
    "summary": "Two-line summary plus why it matters."
  }
]
```

### `GET /news/translate`

Query parameters:
- `text`: string
- `lang`: string, defaults to `Tamil`

Example:

```http
GET /news/translate?text=AI%20is%20changing%20markets&lang=Tamil
```

Example response:

```json
{
  "translated": "..."
}
```

### `GET /news/video`

Query parameters:
- `text`: string

Returns:
- `video/mp4` on success

## Setup

## Prerequisites

- Node.js 20.x
- npm
- Python 3.10+ recommended
- A NewsAPI key
- An OpenAI API key

## 1. Clone the repository

```bash
git clone <your-repo-url>
cd ai-news-experience
```

## 2. Backend setup

Create a `.env` file inside `backend/`:

```env
OPENAI_API_KEY=your_openai_api_key
NEWS_API_KEY=your_newsapi_key
```

Install backend dependencies:

```bash
cd backend
python -m venv venv
```

### Windows PowerShell

```powershell
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### macOS / Linux

```bash
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

Swagger docs will be available at:

```text
http://127.0.0.1:8000/docs
```

## 3. Frontend setup

From the project root:

```bash
npm install
npm run dev
```

The frontend will usually run at:

```text
http://localhost:5173
```

## Running Modes

### Use deployed backend

If your backend is already deployed on Render, keep the API base URL in [src/services/api.js](d:\ai-news-experience\src\services\api.js:3) pointing to your Render URL:

```js
const API = "https://ai-agent-news-experience.onrender.com";
```

Then you only need:

```bash
npm run dev
```

### Use local backend

If you want the frontend to talk to your local FastAPI server instead, change the same file to:

```js
const API = "http://localhost:8000";
```

Then run:

```bash
cd backend
uvicorn app.main:app --reload
```

and in another terminal:

```bash
npm run dev
```

## Environment Variables

### Backend

Required in `backend/.env`:

```env
OPENAI_API_KEY=your_openai_api_key
NEWS_API_KEY=your_newsapi_key
```

### Frontend

The frontend does not currently use a `.env` file.
It uses a hardcoded API base URL in `src/services/api.js`.

## Deployment

### Backend deployment

The backend is suitable for deployment to services like Render.

Typical command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port 10000
```

Important deployment note:
- The current CORS setup in `backend/app/main.py` only allows `http://localhost:5173`
- For production, update `allow_origins` to include your deployed frontend domain

### Frontend deployment

The frontend can be deployed as a static Vite app to platforms like:
- Vercel
- Netlify
- Render static sites

Build command:

```bash
npm run build
```

Preview command:

```bash
npm run preview
```

## Known Limitations

- The backend prints API keys in `backend/app/config.py` for debugging. This is not safe for production and should be removed before public deployment.
- `video_service.py` generates audio, but the returned video is currently silent because the audio is not merged into the final `.mp4`.
- The NewsAPI request is limited to business headlines from the US.
- The frontend currently hardcodes the backend URL instead of reading from environment variables.
- CORS is configured only for `http://localhost:5173`.
- Generated media files are written to the backend working directory and are not cleaned up automatically.

## Troubleshooting

### Blank frontend page

If the frontend loads a blank page:

1. Open the browser console
2. Look for React runtime errors
3. Restart the Vite dev server
4. Confirm the API URL in `src/services/api.js`

### Translation or summaries return original text

This usually means:
- OpenAI API key is missing
- OpenAI request failed
- The backend fallback logic returned the source text

### News feed is empty or generic

Possible reasons:
- NewsAPI key is missing or invalid
- No articles matched the persona keywords
- The backend fallback returned default demo content

### Frontend cannot call backend

Check:
- Backend is running or deployed
- API base URL is correct
- CORS allows the frontend origin

## Suggested Improvements

- Move frontend API base URL into a Vite environment variable
- Add authentication and saved user preferences
- Support more personas and categories
- Merge generated audio into exported videos
- Add article images and richer source metadata
- Add automated tests for frontend and backend
- Add persistent caching for generated summaries and translations

## Development Notes

### Frontend files
- [src/App.jsx](d:\ai-news-experience\src\App.jsx:1): app shell and page layout
- [src/components/ProfileSelector.jsx](d:\ai-news-experience\src\components\ProfileSelector.jsx:1): persona switcher
- [src/components/Feed.jsx](d:\ai-news-experience\src\components\Feed.jsx:1): feed loading and rendering
- [src/components/NewsCard.jsx](d:\ai-news-experience\src\components\NewsCard.jsx:1): article card actions
- [src/services/api.js](d:\ai-news-experience\src\services\api.js:1): frontend API helper functions
- [src/styles.css](d:\ai-news-experience\src\styles.css:1): visual styling

### Backend files
- [main.py](d:\ai-news-experience\backend\app\main.py:1): FastAPI app and CORS setup
- [news.py](d:\ai-news-experience\backend\app\routes\news.py:1): API routes
- [news_service.py](d:\ai-news-experience\backend\app\services\news_service.py:1): news ingestion
- [personalization.py](d:\ai-news-experience\backend\app\services\personalization.py:1): persona filtering
- [ai_service.py](d:\ai-news-experience\backend\app\services\ai_service.py:1): summarization and translation
- [video_service.py](d:\ai-news-experience\backend\app\services\video_service.py:1): video generation

## License

This project is open-source and available under the MIT License.
