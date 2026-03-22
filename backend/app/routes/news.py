from fastapi import APIRouter, Query
from fastapi.responses import FileResponse

from app.services.news_service import fetch_news
from app.services.personalization import personalize_news
from app.services.ai_service import summarize_news, translate
from app.services.video_service import create_video

router = APIRouter(prefix="/news", tags=["news"])


# 📰 Get Personalized News with AI Summary
@router.get("/")
def get_news(user_type: str = Query("student")):
    try:
        # Step 1: Fetch raw news
        news = fetch_news()

        # Step 2: Personalize based on user type
        personalized = personalize_news(news, user_type)

        # Step 3: Add AI summary + "Why this matters"
        for article in personalized:
            article["summary"] = summarize_news(
                article.get("title", ""),
                user_type
            )

        return personalized

    except Exception as e:
        print("ERROR IN /news:", e)
        return []


# 🌍 Translate News
@router.get("/translate")
def translate_news(text: str, lang: str = "Tamil"):
    try:
        translated_text = translate(text, lang)
        return {"translated": translated_text}
    except Exception as e:
        print("TRANSLATION ERROR:", e)
        return {"translated": text}


# 🎥 Generate Video from News
@router.get("/video")
def generate_video(text: str):
    try:
        video_path = create_video(text)
        return FileResponse(
            video_path,
            media_type="video/mp4",
            filename="news.mp4"
        )
    except Exception as e:
        print("VIDEO ERROR:", e)
        return {"message": "Video generation failed"}