from typing import List
from fastapi import APIRouter, Depends, status
from app.api.deps import get_current_active_user, get_current_admin
from app.models.user import User
from app.schemas.driver import DriverCreate, DriverUpdate, DriverResponse
from app.services.driver import DriverService

router = APIRouter()

@router.post("/", response_model=DriverResponse, status_code=status.HTTP_201_CREATED)
async def create_driver(
    driver_in: DriverCreate,
    current_user: User = Depends(get_current_admin)
):
    """Create new driver (Admin only)"""
    return await DriverService.create_driver(driver_in)

@router.get("/", response_model=List[DriverResponse])
async def read_drivers(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_active_user)
):
    """Retrieve drivers."""
    return await DriverService.get_drivers(skip=skip, limit=limit)

@router.get("/{driver_id}", response_model=DriverResponse)
async def read_driver(
    driver_id: str,
    current_user: User = Depends(get_current_active_user)
):
    """Get driver by ID."""
    return await DriverService.get_driver(driver_id)

@router.put("/{driver_id}", response_model=DriverResponse)
async def update_driver(
    driver_id: str,
    driver_in: DriverUpdate,
    current_user: User = Depends(get_current_admin)
):
    """Update a driver (Admin only)."""
    return await DriverService.update_driver(driver_id, driver_in)

@router.delete("/{driver_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_driver(
    driver_id: str,
    current_user: User = Depends(get_current_admin)
):
    """Delete a driver (Admin only)."""
    await DriverService.delete_driver(driver_id)
