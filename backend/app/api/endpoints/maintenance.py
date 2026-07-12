from typing import List
from fastapi import APIRouter, Depends, status
from app.api.deps import get_current_active_user, get_current_admin
from app.models.user import User
from app.schemas.maintenance import MaintenanceCreate, MaintenanceUpdate, MaintenanceComplete, MaintenanceResponse
from app.services.maintenance import MaintenanceService

router = APIRouter()

@router.post("/", response_model=MaintenanceResponse, status_code=status.HTTP_201_CREATED)
async def create_maintenance(
    maint_in: MaintenanceCreate,
    current_user: User = Depends(get_current_admin)
):
    """Create a new maintenance record (Admin only)."""
    return await MaintenanceService.create_maintenance(maint_in)

@router.get("/", response_model=List[MaintenanceResponse])
async def read_maintenances(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_active_user)
):
    """Retrieve all maintenance records."""
    return await MaintenanceService.get_all_maintenance(skip=skip, limit=limit)

@router.get("/{maint_id}", response_model=MaintenanceResponse)
async def read_maintenance(
    maint_id: str,
    current_user: User = Depends(get_current_active_user)
):
    """Get a maintenance record by ID."""
    return await MaintenanceService.get_maintenance(maint_id)

@router.put("/{maint_id}", response_model=MaintenanceResponse)
async def update_maintenance(
    maint_id: str,
    maint_in: MaintenanceUpdate,
    current_user: User = Depends(get_current_admin)
):
    """Update active maintenance description (Admin only)."""
    return await MaintenanceService.update_maintenance(maint_id, maint_in)

@router.post("/{maint_id}/complete", response_model=MaintenanceResponse)
async def complete_maintenance(
    maint_id: str,
    comp_data: MaintenanceComplete,
    current_user: User = Depends(get_current_admin)
):
    """Complete a maintenance record (Admin only)."""
    return await MaintenanceService.complete_maintenance(maint_id, comp_data)

@router.post("/{maint_id}/cancel", response_model=MaintenanceResponse)
async def cancel_maintenance(
    maint_id: str,
    current_user: User = Depends(get_current_admin)
):
    """Cancel a maintenance record (Admin only)."""
    return await MaintenanceService.cancel_maintenance(maint_id)
