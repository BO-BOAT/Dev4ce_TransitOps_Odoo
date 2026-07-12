from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime
from beanie import PydanticObjectId

# Fuel Schemas
class FuelLogCreate(BaseModel):
    vehicle_id: PydanticObjectId
    liters: float = Field(gt=0)
    cost: float = Field(ge=0)
    date: datetime
    notes: Optional[str] = None

class FuelLogResponse(BaseModel):
    id: PydanticObjectId = Field(alias="_id")
    vehicle_id: PydanticObjectId
    liters: float
    cost: float
    date: datetime
    notes: Optional[str]
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(populate_by_name=True, from_attributes=True)

# Expense Schemas
class ExpenseLogCreate(BaseModel):
    vehicle_id: PydanticObjectId
    type: str = Field(min_length=1)
    amount: float = Field(ge=0)
    date: datetime
    notes: Optional[str] = None

class ExpenseLogResponse(BaseModel):
    id: PydanticObjectId = Field(alias="_id")
    vehicle_id: PydanticObjectId
    type: str
    amount: float
    date: datetime
    notes: Optional[str]
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(populate_by_name=True, from_attributes=True)

# Aggregate Schema
class VehicleOperationalCost(BaseModel):
    vehicle_id: str
    total_fuel_cost: float
    total_maintenance_cost: float
    total_expense_amount: float
    grand_total: float
