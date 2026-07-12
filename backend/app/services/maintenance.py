import logging
from typing import List, Optional
from fastapi import HTTPException, status
from datetime import datetime, timezone
from bson.errors import InvalidId
from beanie.odm.fields import PydanticObjectId

from app.models.maintenance import Maintenance
from app.schemas.maintenance import MaintenanceCreate, MaintenanceUpdate, MaintenanceComplete, MaintenanceStatus
from app.services.vehicle import VehicleService
from app.schemas.vehicle import VehicleUpdate, VehicleStatus

logger = logging.getLogger(__name__)

class MaintenanceService:
    @staticmethod
    async def create_maintenance(maint_in: MaintenanceCreate) -> Maintenance:
        logger.info(f"Starting maintenance for vehicle: {maint_in.vehicle_id}")
        
        vehicle = await VehicleService.get_vehicle(str(maint_in.vehicle_id))
        if vehicle.status != VehicleStatus.available:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Vehicle {maint_in.vehicle_id} is not available (current status: {vehicle.status})"
            )
            
        await VehicleService.update_vehicle(
            str(maint_in.vehicle_id),
            VehicleUpdate(status=VehicleStatus.in_shop)
        )
        
        try:
            maint = Maintenance(**maint_in.model_dump())
            await maint.insert()
            logger.info(f"Successfully created maintenance record ID: {maint.id}")
            return maint
        except Exception as e:
            logger.error(f"Failed to create maintenance record. Rolling back vehicle {maint_in.vehicle_id}.")
            await VehicleService.update_vehicle(
                str(maint_in.vehicle_id),
                VehicleUpdate(status=VehicleStatus.available)
            )
            raise e

    @staticmethod
    async def get_maintenance(maint_id: str) -> Maintenance:
        try:
            object_id = PydanticObjectId(maint_id)
        except InvalidId:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid maintenance ID format"
            )
        maint = await Maintenance.get(object_id)
        if not maint:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Maintenance record not found"
            )
        return maint

    @staticmethod
    async def get_all_maintenance(skip: int = 0, limit: int = 100) -> List[Maintenance]:
        return await Maintenance.find_all().skip(skip).limit(limit).to_list()

    @staticmethod
    async def update_maintenance(maint_id: str, maint_in: MaintenanceUpdate) -> Maintenance:
        maint = await MaintenanceService.get_maintenance(maint_id)
        if maint.status != MaintenanceStatus.active.value:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Can only update active maintenance records"
            )
            
        update_data = maint_in.model_dump(exclude_unset=True)
        if update_data:
            for key, value in update_data.items():
                setattr(maint, key, value)
            maint.updated_at = datetime.now(timezone.utc)
            await maint.save()
        return maint

    @staticmethod
    async def complete_maintenance(maint_id: str, comp_data: MaintenanceComplete) -> Maintenance:
        maint = await MaintenanceService.get_maintenance(maint_id)
        if maint.status != MaintenanceStatus.active.value:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Only Active maintenance can be completed. Current status: {maint.status}"
            )
            
        vehicle = await VehicleService.get_vehicle(str(maint.vehicle_id))
        
        if vehicle.status != VehicleStatus.retired:
            await VehicleService.update_vehicle(
                str(maint.vehicle_id),
                VehicleUpdate(status=VehicleStatus.available)
            )
            
        maint.status = MaintenanceStatus.completed.value
        maint.cost = comp_data.cost
        maint.end_date = datetime.now(timezone.utc)
        maint.updated_at = datetime.now(timezone.utc)
        await maint.save()
        logger.info(f"Completed maintenance {maint.id}")
        return maint

    @staticmethod
    async def cancel_maintenance(maint_id: str) -> Maintenance:
        maint = await MaintenanceService.get_maintenance(maint_id)
        if maint.status != MaintenanceStatus.active.value:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only Active maintenance can be cancelled."
            )
            
        vehicle = await VehicleService.get_vehicle(str(maint.vehicle_id))
        if vehicle.status != VehicleStatus.retired:
            await VehicleService.update_vehicle(
                str(maint.vehicle_id),
                VehicleUpdate(status=VehicleStatus.available)
            )
            
        maint.status = MaintenanceStatus.cancelled.value
        maint.updated_at = datetime.now(timezone.utc)
        await maint.save()
        logger.info(f"Cancelled maintenance {maint.id}")
        return maint
