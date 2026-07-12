import logging
from typing import List, Optional
from fastapi import HTTPException, status
from datetime import datetime, timezone
from bson.errors import InvalidId
from beanie.odm.fields import PydanticObjectId
from app.models.vehicle import Vehicle
from app.schemas.vehicle import VehicleCreate, VehicleUpdate

logger = logging.getLogger(__name__)

class VehicleService:
    @staticmethod
    async def _check_registration_unique(registration_number: str, exclude_id: Optional[PydanticObjectId] = None):
        """Helper to ensure registration numbers are unique across the fleet."""
        existing = await Vehicle.find_one(Vehicle.registration_number == registration_number)
        if existing and existing.id != exclude_id:
            logger.warning(f"Registration number conflict detected: {registration_number}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Vehicle with registration {registration_number} already exists"
            )

    @staticmethod
    async def create_vehicle(vehicle_in: VehicleCreate) -> Vehicle:
        logger.info(f"Creating new vehicle with registration: {vehicle_in.registration_number}")
        await VehicleService._check_registration_unique(vehicle_in.registration_number)
        
        vehicle = Vehicle(**vehicle_in.model_dump())
        await vehicle.insert()
        
        logger.info(f"Successfully created vehicle with ID: {vehicle.id}")
        return vehicle

    @staticmethod
    async def get_vehicle(vehicle_id: str) -> Vehicle:
        try:
            object_id = PydanticObjectId(vehicle_id)
        except InvalidId:
            logger.error(f"Invalid vehicle ID format provided: {vehicle_id}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid vehicle ID format"
            )
            
        vehicle = await Vehicle.get(object_id)
        if not vehicle:
            logger.warning(f"Vehicle lookup failed, ID not found: {vehicle_id}")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Vehicle not found"
            )
        return vehicle

    @staticmethod
    async def get_vehicles(skip: int = 0, limit: int = 100) -> List[Vehicle]:
        logger.info(f"Fetching vehicles page with skip={skip}, limit={limit}")
        return await Vehicle.find_all().skip(skip).limit(limit).to_list()

    @staticmethod
    async def update_vehicle(vehicle_id: str, vehicle_in: VehicleUpdate) -> Vehicle:
        logger.info(f"Updating vehicle ID: {vehicle_id}")
        vehicle = await VehicleService.get_vehicle(vehicle_id)
        
        update_data = vehicle_in.model_dump(exclude_unset=True)
        if "registration_number" in update_data:
            await VehicleService._check_registration_unique(
                update_data["registration_number"], exclude_id=vehicle.id
            )
        
        if update_data:
            for key, value in update_data.items():
                setattr(vehicle, key, value)
            vehicle.updated_at = datetime.now(timezone.utc)
            await vehicle.save()
            logger.info(f"Successfully updated vehicle ID: {vehicle.id}")
            
        return vehicle

    @staticmethod
    async def delete_vehicle(vehicle_id: str) -> None:
        logger.info(f"Deleting vehicle ID: {vehicle_id}")
        vehicle = await VehicleService.get_vehicle(vehicle_id)
        await vehicle.delete()
        logger.info(f"Successfully deleted vehicle ID: {vehicle_id}")
