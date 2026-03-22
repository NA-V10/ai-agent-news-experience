import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
NEWS_API_KEY = os.getenv("NEWS_API_KEY")

print("DEBUG OPENAI KEY:", OPENAI_API_KEY)
print("DEBUG NEWS KEY:", NEWS_API_KEY)