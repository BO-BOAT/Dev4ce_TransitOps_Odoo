from datetime import datetime, timezone
from typing import Optional
from beanie import Document, PydanticObjectId
from pydantic import Field

class FuelLog(Document):
    vehicle_id: PydanticObjectId
    liters: float
    cost: float
    date: datetime
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Settings:
        name = "fuel_logs"


class ExpenseLog(Document):
    vehicle_id: PydanticObjectId
    type: str  # e.g., 'Tolls', 'Insurance', 'Cleaning', 'Other'
    amount: float
    date: datetime
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Settings:
        name = "expense_logs"
