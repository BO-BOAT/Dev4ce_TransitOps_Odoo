from datetime import datetime, timezone
from typing import Optional
from beanie import Document
from pydantic import Field
from app.schemas.vehicle import VehicleStatus

class Vehicle(Document):
    registration_number: str = Field(unique=True)
    status: VehicleStatus = VehicleStatus.available
    make: str
    model: str
    year: int
    capacity: int
    mileage: int = 0
    depot: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Settings:
        name = "vehicles"
