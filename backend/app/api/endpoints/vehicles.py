from typing import List
from fastapi import APIRouter, Depends, status
from app.api.deps import get_current_active_user, get_current_admin
from app.models.user import User
from app.schemas.vehicle import VehicleCreate, VehicleUpdate, VehicleResponse
from app.services.vehicle import VehicleService

router = APIRouter()

@router.post("/", response_model=VehicleResponse, status_code=status.HTTP_201_CREATED)
async def create_vehicle(
    vehicle_in: VehicleCreate,
    current_user: User = Depends(get_current_admin)
):
    """Create new vehicle (Admin only)"""
    return await VehicleService.create_vehicle(vehicle_in)

@router.get("/", response_model=List[VehicleResponse])
async def read_vehicles(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_active_user)
):
    """Retrieve vehicles."""
    return await VehicleService.get_vehicles(skip=skip, limit=limit)

@router.get("/{vehicle_id}", response_model=VehicleResponse)
async def read_vehicle(
    vehicle_id: str,
    current_user: User = Depends(get_current_active_user)
):
    """Get vehicle by ID."""
    return await VehicleService.get_vehicle(vehicle_id)

@router.put("/{vehicle_id}", response_model=VehicleResponse)
async def update_vehicle(
    vehicle_id: str,
    vehicle_in: VehicleUpdate,
    current_user: User = Depends(get_current_admin)
):
    """Update a vehicle (Admin only)."""
    return await VehicleService.update_vehicle(vehicle_id, vehicle_in)

@router.delete("/{vehicle_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_vehicle(
    vehicle_id: str,
    current_user: User = Depends(get_current_admin)
):
    """Delete a vehicle (Admin only)."""
    await VehicleService.delete_vehicle(vehicle_id)
