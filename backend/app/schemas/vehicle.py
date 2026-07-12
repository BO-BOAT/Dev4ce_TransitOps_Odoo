from enum import Enum
from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime
from beanie import PydanticObjectId

class VehicleStatus(str, Enum):
    available = "Available"
    on_trip = "On Trip"
    in_shop = "In Shop"
    retired = "Retired"

class VehicleBase(BaseModel):
    registration_number: str
    make: str
    model: str
    year: int
    capacity: int
    mileage: Optional[int] = 0
    depot: str
    status: Optional[VehicleStatus] = VehicleStatus.available

class VehicleCreate(VehicleBase):
    pass

class VehicleUpdate(BaseModel):
    registration_number: Optional[str] = None
    make: Optional[str] = None
    model: Optional[str] = None
    year: Optional[int] = None
    capacity: Optional[int] = None
    mileage: Optional[int] = None
    depot: Optional[str] = None
    status: Optional[VehicleStatus] = None

class VehicleResponse(VehicleBase):
    id: PydanticObjectId = Field(alias="_id")
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(
        populate_by_name=True,
        from_attributes=True
    )
