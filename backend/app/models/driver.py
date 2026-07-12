from datetime import datetime, timezone, date
from typing import Optional
from beanie import Document
from pydantic import Field

class Driver(Document):
    first_name: str
    last_name: str
    license_number: str = Field(unique=True)
    license_expiry: date
    contact_number: str
    safety_score: int = Field(default=100, ge=0, le=100)
    status: str = "Available" # Available, On Trip, Off Duty, Suspended
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Settings:
        name = "drivers"
