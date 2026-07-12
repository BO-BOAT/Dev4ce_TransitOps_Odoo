from datetime import datetime, timezone
from typing import Optional
from beanie import Document, PydanticObjectId
from pydantic import Field
from app.schemas.maintenance import MaintenanceStatus

class Maintenance(Document):
    vehicle_id: PydanticObjectId
    description: str
    cost: Optional[float] = None
    start_date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    end_date: Optional[datetime] = None
    status: MaintenanceStatus = MaintenanceStatus.active
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Settings:
        name = "maintenance"
