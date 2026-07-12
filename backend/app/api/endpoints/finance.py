from typing import List
from fastapi import APIRouter, Depends, status
from app.api.deps import get_current_active_user
from app.models.user import User
from app.schemas.finance import FuelLogCreate, FuelLogResponse, ExpenseLogCreate, ExpenseLogResponse, VehicleOperationalCost
from app.services.finance import FinanceService

router = APIRouter()

@router.post("/fuel", response_model=FuelLogResponse, status_code=status.HTTP_201_CREATED)
async def create_fuel_log(
    log_in: FuelLogCreate,
    current_user: User = Depends(get_current_active_user)
):
    """Log fuel consumption for a vehicle."""
    return await FinanceService.create_fuel_log(log_in)

@router.get("/fuel", response_model=List[FuelLogResponse])
async def get_fuel_logs(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_active_user)
):
    """Get all fuel logs."""
    return await FinanceService.get_fuel_logs(skip=skip, limit=limit)

@router.post("/expenses", response_model=ExpenseLogResponse, status_code=status.HTTP_201_CREATED)
async def create_expense_log(
    expense_in: ExpenseLogCreate,
    current_user: User = Depends(get_current_active_user)
):
    """Log an operational expense for a vehicle."""
    return await FinanceService.create_expense_log(expense_in)

@router.get("/expenses", response_model=List[ExpenseLogResponse])
async def get_expense_logs(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_active_user)
):
    """Get all operational expenses."""
    return await FinanceService.get_expense_logs(skip=skip, limit=limit)

@router.get("/costs/{vehicle_id}", response_model=VehicleOperationalCost)
async def get_operational_costs(
    vehicle_id: str,
    current_user: User = Depends(get_current_active_user)
):
    """Aggregate total operational costs (fuel + maintenance + expenses) for a vehicle."""
    return await FinanceService.get_vehicle_operational_cost(vehicle_id)
