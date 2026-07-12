from typing import List
from fastapi import APIRouter, Depends, status
from app.api.deps import get_current_active_user, get_current_admin
from app.models.user import User
from app.schemas.trip import TripCreate, TripUpdate, TripComplete, TripResponse
from app.services.trip import TripService

router = APIRouter()

@router.post("/", response_model=TripResponse, status_code=status.HTTP_201_CREATED)
async def create_trip(
    trip_in: TripCreate,
    current_user: User = Depends(get_current_admin)
):
    """Create new trip (Admin only)."""
    return await TripService.create_trip(trip_in)

@router.get("/", response_model=List[TripResponse])
async def read_trips(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_active_user)
):
    """Retrieve all trips."""
    return await TripService.get_trips(skip=skip, limit=limit)

@router.get("/{trip_id}", response_model=TripResponse)
async def read_trip(
    trip_id: str,
    current_user: User = Depends(get_current_active_user)
):
    """Get a trip by ID."""
    return await TripService.get_trip(trip_id)

@router.put("/{trip_id}", response_model=TripResponse)
async def update_trip(
    trip_id: str,
    trip_in: TripUpdate,
    current_user: User = Depends(get_current_admin)
):
    """Update a draft trip (Admin only)."""
    return await TripService.update_trip(trip_id, trip_in)

@router.post("/{trip_id}/dispatch", response_model=TripResponse)
async def dispatch_trip(
    trip_id: str,
    current_user: User = Depends(get_current_admin)
):
    """Dispatch a trip (Admin only)."""
    return await TripService.dispatch_trip(trip_id)

@router.post("/{trip_id}/complete", response_model=TripResponse)
async def complete_trip(
    trip_id: str,
    completion_data: TripComplete,
    current_user: User = Depends(get_current_admin)
):
    """Complete a dispatched trip (Admin only)."""
    return await TripService.complete_trip(trip_id, completion_data)

@router.post("/{trip_id}/cancel", response_model=TripResponse)
async def cancel_trip(
    trip_id: str,
    current_user: User = Depends(get_current_admin)
):
    """Cancel a draft trip (Admin only)."""
    return await TripService.cancel_trip(trip_id)
