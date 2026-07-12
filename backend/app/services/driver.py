import logging
from typing import List, Optional
from fastapi import HTTPException, status
from datetime import datetime, timezone
from bson.errors import InvalidId
from beanie.odm.fields import PydanticObjectId
from app.models.driver import Driver
from app.schemas.driver import DriverCreate, DriverUpdate

logger = logging.getLogger(__name__)

class DriverService:
    @staticmethod
    async def _check_license_unique(license_number: str, exclude_id: Optional[PydanticObjectId] = None):
        """Helper to ensure license numbers are unique across drivers."""
        existing = await Driver.find_one(Driver.license_number == license_number)
        if existing and existing.id != exclude_id:
            logger.warning(f"License number conflict detected: {license_number}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Driver with license {license_number} already exists"
            )

    @staticmethod
    async def create_driver(driver_in: DriverCreate) -> Driver:
        logger.info(f"Creating new driver with license: {driver_in.license_number}")
        await DriverService._check_license_unique(driver_in.license_number)
        
        driver = Driver(**driver_in.model_dump())
        await driver.insert()
        
        logger.info(f"Successfully created driver with ID: {driver.id}")
        return driver

    @staticmethod
    async def get_driver(driver_id: str) -> Driver:
        try:
            object_id = PydanticObjectId(driver_id)
        except InvalidId:
            logger.error(f"Invalid driver ID format provided: {driver_id}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid driver ID format"
            )
            
        driver = await Driver.get(object_id)
        if not driver:
            logger.warning(f"Driver lookup failed, ID not found: {driver_id}")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Driver not found"
            )
        return driver

    @staticmethod
    async def get_drivers(skip: int = 0, limit: int = 100) -> List[Driver]:
        logger.info(f"Fetching drivers page with skip={skip}, limit={limit}")
        return await Driver.find_all().skip(skip).limit(limit).to_list()

    @staticmethod
    async def update_driver(driver_id: str, driver_in: DriverUpdate) -> Driver:
        logger.info(f"Updating driver ID: {driver_id}")
        driver = await DriverService.get_driver(driver_id)
        
        update_data = driver_in.model_dump(exclude_unset=True)
        if "license_number" in update_data:
            await DriverService._check_license_unique(
                update_data["license_number"], exclude_id=driver.id
            )
        
        if update_data:
            for key, value in update_data.items():
                setattr(driver, key, value)
            driver.updated_at = datetime.now(timezone.utc)
            await driver.save()
            logger.info(f"Successfully updated driver ID: {driver.id}")
            
        return driver

    @staticmethod
    async def delete_driver(driver_id: str) -> None:
        logger.info(f"Deleting driver ID: {driver_id}")
        driver = await DriverService.get_driver(driver_id)
        await driver.delete()
        logger.info(f"Successfully deleted driver ID: {driver_id}")
