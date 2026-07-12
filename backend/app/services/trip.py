import logging
from typing import List, Optional
from fastapi import HTTPException, status
from datetime import datetime, timezone, date
from bson.errors import InvalidId
from beanie.odm.fields import PydanticObjectId

from app.models.trip import Trip
from app.schemas.trip import TripCreate, TripUpdate, TripComplete, TripStatus
from app.services.vehicle import VehicleService
from app.schemas.vehicle import VehicleUpdate, VehicleStatus
from app.services.driver import DriverService
from app.schemas.driver import DriverUpdate, DriverStatus

logger = logging.getLogger(__name__)

class TripService:
    @staticmethod
    async def _validate_vehicle_for_trip(vehicle_id: PydanticObjectId, cargo_weight: float):
        vehicle = await VehicleService.get_vehicle(str(vehicle_id))
        if vehicle.status != VehicleStatus.available:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Vehicle {vehicle_id} is not available (current status: {vehicle.status})"
            )
        if vehicle.capacity < cargo_weight:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Vehicle capacity ({vehicle.capacity}) is less than cargo weight ({cargo_weight})"
            )
        return vehicle

    @staticmethod
    async def _validate_driver_for_trip(driver_id: PydanticObjectId):
        driver = await DriverService.get_driver(str(driver_id))
        if driver.status != DriverStatus.available:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Driver {driver_id} is not available (current status: {driver.status})"
            )
        if driver.license_expiry < date.today():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Driver {driver_id} has an expired license"
            )
        return driver

    @staticmethod
    async def create_trip(trip_in: TripCreate) -> Trip:
        logger.info(f"Creating new Draft trip from {trip_in.source} to {trip_in.destination}")
        
        await TripService._validate_vehicle_for_trip(trip_in.vehicle_id, trip_in.cargo_weight)
        await TripService._validate_driver_for_trip(trip_in.driver_id)
            
        trip = Trip(**trip_in.model_dump(), status=TripStatus.draft.value)
        await trip.insert()
        logger.info(f"Successfully created Trip ID: {trip.id}")
        return trip

    @staticmethod
    async def get_trip(trip_id: str) -> Trip:
        try:
            object_id = PydanticObjectId(trip_id)
        except InvalidId:
            logger.error(f"Invalid trip ID format provided: {trip_id}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid trip ID format"
            )
        trip = await Trip.get(object_id)
        if not trip:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Trip not found"
            )
        return trip

    @staticmethod
    async def get_trips(skip: int = 0, limit: int = 100) -> List[Trip]:
        return await Trip.find_all().skip(skip).limit(limit).to_list()

    @staticmethod
    async def update_trip(trip_id: str, trip_in: TripUpdate) -> Trip:
        trip = await TripService.get_trip(trip_id)
        if trip.status != TripStatus.draft.value:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Can only update trips in Draft status"
            )
            
        update_data = trip_in.model_dump(exclude_unset=True)
        
        new_cargo_weight = update_data.get("cargo_weight", trip.cargo_weight)
        new_vehicle_id = update_data.get("vehicle_id", trip.vehicle_id)
        new_driver_id = update_data.get("driver_id", trip.driver_id)
        
        if new_vehicle_id:
            await TripService._validate_vehicle_for_trip(new_vehicle_id, new_cargo_weight)
            
        if new_driver_id:
            await TripService._validate_driver_for_trip(new_driver_id)
            
        for key, value in update_data.items():
            setattr(trip, key, value)
        trip.updated_at = datetime.now(timezone.utc)
        await trip.save()
        return trip

    @staticmethod
    async def dispatch_trip(trip_id: str) -> Trip:
        trip = await TripService.get_trip(trip_id)
        if trip.status != TripStatus.draft.value:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Only Draft trips can be dispatched. Current status: {trip.status}"
            )
            
        await TripService._validate_vehicle_for_trip(trip.vehicle_id, trip.cargo_weight)
        await TripService._validate_driver_for_trip(trip.driver_id)
        
        # Safe compensation rollback
        await VehicleService.update_vehicle(
            str(trip.vehicle_id), 
            VehicleUpdate(status=VehicleStatus.on_trip)
        )
        
        try:
            await DriverService.update_driver(
                str(trip.driver_id),
                DriverUpdate(status=DriverStatus.on_trip)
            )
        except Exception as e:
            logger.error(f"Failed to update driver {trip.driver_id}. Rolling back vehicle {trip.vehicle_id}.")
            await VehicleService.update_vehicle(
                str(trip.vehicle_id), 
                VehicleUpdate(status=VehicleStatus.available)
            )
            raise e
        
        trip.status = TripStatus.dispatched.value
        trip.start_time = datetime.now(timezone.utc)
        trip.updated_at = datetime.now(timezone.utc)
        await trip.save()
        logger.info(f"Dispatched trip {trip.id}")
        return trip

    @staticmethod
    async def complete_trip(trip_id: str, completion_data: TripComplete) -> Trip:
        trip = await TripService.get_trip(trip_id)
        if trip.status != TripStatus.dispatched.value:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Only Dispatched trips can be completed. Current status: {trip.status}"
            )
            
        vehicle = await VehicleService.get_vehicle(str(trip.vehicle_id))
        new_mileage = vehicle.mileage + int(completion_data.actual_distance)
        
        # Safe compensation rollback
        await VehicleService.update_vehicle(
            str(trip.vehicle_id), 
            VehicleUpdate(status=VehicleStatus.available, mileage=new_mileage)
        )
        
        try:
            await DriverService.update_driver(
                str(trip.driver_id),
                DriverUpdate(status=DriverStatus.available)
            )
        except Exception as e:
            logger.error(f"Failed to update driver {trip.driver_id}. Rolling back vehicle {trip.vehicle_id}.")
            await VehicleService.update_vehicle(
                str(trip.vehicle_id), 
                VehicleUpdate(status=VehicleStatus.on_trip, mileage=vehicle.mileage)
            )
            raise e
        
        trip.actual_distance = completion_data.actual_distance
        trip.fuel_consumed = completion_data.fuel_consumed
        trip.status = TripStatus.completed.value
        trip.end_time = datetime.now(timezone.utc)
        trip.updated_at = datetime.now(timezone.utc)
        await trip.save()
        logger.info(f"Completed trip {trip.id}")
        return trip

    @staticmethod
    async def cancel_trip(trip_id: str) -> Trip:
        trip = await TripService.get_trip(trip_id)
        if trip.status not in [TripStatus.draft.value, TripStatus.dispatched.value]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only Draft or Dispatched trips can be cancelled."
            )
            
        if trip.status == TripStatus.dispatched.value:
            # Safe compensation rollback
            await VehicleService.update_vehicle(
                str(trip.vehicle_id), 
                VehicleUpdate(status=VehicleStatus.available)
            )
            try:
                await DriverService.update_driver(
                    str(trip.driver_id),
                    DriverUpdate(status=DriverStatus.available)
                )
            except Exception as e:
                logger.error(f"Failed to update driver {trip.driver_id}. Rolling back vehicle {trip.vehicle_id}.")
                await VehicleService.update_vehicle(
                    str(trip.vehicle_id), 
                    VehicleUpdate(status=VehicleStatus.on_trip)
                )
                raise e
            
        trip.status = TripStatus.cancelled.value
        trip.updated_at = datetime.now(timezone.utc)
        await trip.save()
        logger.info(f"Cancelled trip {trip.id}")
        return trip
