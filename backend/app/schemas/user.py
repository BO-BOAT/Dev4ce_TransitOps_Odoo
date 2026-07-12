from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: Optional[str] = "dispatcher"

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: str = Field(alias="_id")
    is_active: bool
    created_at: datetime
    
    class Config:
        populate_by_name = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
