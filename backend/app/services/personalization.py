def personalize_news(news, user_type):
    keywords = {
        "student": ["education", "career", "internship"],
        "investor": ["stock", "market", "ipo"],
        "founder": ["startup", "funding", "venture"]
    }

    selected = keywords.get(user_type, [])

    filtered = [
        n for n in news
        if any(k in n["title"].lower() for k in selected)
    ]

    # ✅ IMPORTANT FIX (fallback)
    return filtered if len(filtered) > 0 else news[:5]