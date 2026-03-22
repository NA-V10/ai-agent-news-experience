from openai import OpenAI
from app.config import OPENAI_API_KEY

client = OpenAI(api_key=OPENAI_API_KEY or "fallback")


def summarize_news(text):
    try:
        res = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Summarize in 2 short lines"},
                {"role": "user", "content": text}
            ]
        )
        return res.choices[0].message.content
    except:
        return text


def translate(text, lang="Tamil"):
    try:
        res = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": f"Translate into {lang} with local context"
                },
                {"role": "user", "content": text}
            ]
        )
        return res.choices[0].message.content
    except:
        return text
    
def summarize_news(text, user_type="student"):
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": f"""
Summarize this news in 2 lines.
Then add: 'Why this matters for a {user_type}' in 2 lines.
Keep it simple and insightful.
"""
                },
                {"role": "user", "content": text}
            ]
        )
        return response.choices[0].message.content
    except:
        return text