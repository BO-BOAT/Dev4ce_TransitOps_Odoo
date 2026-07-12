from datetime import datetime, timezone
from typing import Optional
from beanie import Document, PydanticObjectId
from pydantic import Field

class Trip(Document):
    source: str
    destination: str
    vehicle_id: Optional[PydanticObjectId] = None
    driver_id: Optional[PydanticObjectId] = None
    cargo_weight: float
    planned_distance: float
    actual_distance: Optional[float] = None
    fuel_consumed: Optional[float] = None
    status: str = "Draft" # Draft, Dispatched, Completed, Cancelled
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Settings:
        name = "trips"
