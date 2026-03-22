from pydantic import BaseModel

class User(BaseModel):
    user_type: str
    preferences: list[str] = []