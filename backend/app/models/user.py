from typing import Optional
from beanie import Document
from pydantic import EmailStr, Field
from datetime import datetime, timezone

class User(Document):
    email: EmailStr = Field(unique=True)
    hashed_password: str
    full_name: str
    role: str = "dispatcher"  # admin, dispatcher, driver
    is_active: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    
    class Settings:
        name = "users"
