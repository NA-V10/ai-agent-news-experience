import requests
from app.config import NEWS_API_KEY

def fetch_news():
    url = "https://newsapi.org/v2/top-headlines"

    params = {
        "category": "business",
        "country": "us",
        "apiKey": NEWS_API_KEY
    }

    try:
        res = requests.get(url, params=params)
        data = res.json()

        print("API RESPONSE:", data)  # 🔥 debug

        articles = data.get("articles", [])

        if not articles:
            raise Exception("No articles from API")

        return [
            {
                "title": a.get("title", ""),
                "description": a.get("description", ""),
                "url": a.get("url", "#")
            }
            for a in articles
        ]

    except Exception as e:
        print("API FAILED:", e)

        # 🔥 fallback (important)
        return [
            {
                "title": "Fallback: Startup funding rises in India",
                "description": "Demo news",
                "url": "#"
            },
            {
                "title": "Fallback: Stock market hits high",
                "description": "Demo news",
                "url": "#"
            }
        ]