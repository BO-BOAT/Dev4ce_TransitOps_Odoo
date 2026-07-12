from enum import Enum
from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime
from beanie import PydanticObjectId

class MaintenanceStatus(str, Enum):
    active = "Active"
    completed = "Completed"
    cancelled = "Cancelled"

class MaintenanceCreate(BaseModel):
    vehicle_id: PydanticObjectId
    description: str

class MaintenanceUpdate(BaseModel):
    description: Optional[str] = None

class MaintenanceComplete(BaseModel):
    cost: float = Field(ge=0)

class MaintenanceResponse(BaseModel):
    id: PydanticObjectId = Field(alias="_id")
    vehicle_id: PydanticObjectId
    description: str
    cost: Optional[float]
    start_date: datetime
    end_date: Optional[datetime]
    status: MaintenanceStatus
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        populate_by_name=True,
        from_attributes=True
    )
