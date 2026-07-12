from enum import Enum
from pydantic import BaseModel, Field, ConfigDict, field_validator
from typing import Optional
from datetime import datetime, date
from beanie import PydanticObjectId
import re

class DriverStatus(str, Enum):
    available = "Available"
    on_trip = "On Trip"
    off_duty = "Off Duty"
    suspended = "Suspended"

class DriverBase(BaseModel):
    first_name: str
    last_name: str
    license_number: str
    license_expiry: date
    contact_number: str
    safety_score: Optional[int] = Field(default=100, ge=0, le=100)
    status: Optional[DriverStatus] = DriverStatus.available

    @field_validator('contact_number')
    @classmethod
    def validate_contact_number(cls, v: str) -> str:
        # Simple phone number validation
        if not re.match(r'^\+?[\d\s\-\(\)]+$', v):
            raise ValueError('Invalid contact number format')
        return v

class DriverCreate(DriverBase):
    @field_validator('license_expiry')
    @classmethod
    def validate_license_expiry(cls, v: date) -> date:
        if v < date.today():
            raise ValueError("License is already expired")
        return v

class DriverUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    license_number: Optional[str] = None
    license_expiry: Optional[date] = None
    contact_number: Optional[str] = None
    safety_score: Optional[int] = Field(default=None, ge=0, le=100)
    status: Optional[DriverStatus] = None

    @field_validator('contact_number')
    @classmethod
    def validate_contact_number(cls, v: str) -> str:
        if v is not None and not re.match(r'^\+?[\d\s\-\(\)]+$', v):
            raise ValueError('Invalid contact number format')
        return v

class DriverResponse(DriverBase):
    id: PydanticObjectId = Field(alias="_id")
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(
        populate_by_name=True,
        from_attributes=True
    )
