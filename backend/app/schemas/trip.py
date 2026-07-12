from enum import Enum
from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime
from beanie import PydanticObjectId

class TripStatus(str, Enum):
    draft = "Draft"
    dispatched = "Dispatched"
    completed = "Completed"
    cancelled = "Cancelled"

class TripCreate(BaseModel):
    source: str
    destination: str
    cargo_weight: float = Field(gt=0)
    planned_distance: float = Field(gt=0)
    vehicle_id: PydanticObjectId
    driver_id: PydanticObjectId

class TripUpdate(BaseModel):
    source: Optional[str] = None
    destination: Optional[str] = None
    cargo_weight: Optional[float] = Field(default=None, gt=0)
    planned_distance: Optional[float] = Field(default=None, gt=0)
    vehicle_id: Optional[PydanticObjectId] = None
    driver_id: Optional[PydanticObjectId] = None

class TripComplete(BaseModel):
    actual_distance: float = Field(ge=0)
    fuel_consumed: float = Field(ge=0)

class TripResponse(BaseModel):
    id: PydanticObjectId = Field(alias="_id")
    source: str
    destination: str
    vehicle_id: PydanticObjectId
    driver_id: PydanticObjectId
    cargo_weight: float
    planned_distance: float
    actual_distance: Optional[float]
    fuel_consumed: Optional[float]
    status: TripStatus
    start_time: Optional[datetime]
    end_time: Optional[datetime]
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        populate_by_name=True,
        from_attributes=True
    )
