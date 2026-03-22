from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ MUST COME BEFORE include_router
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # 👈 use exact origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.routes import news
app.include_router(news.router)

@app.get("/")
def root():
    return {"message": "Running"}