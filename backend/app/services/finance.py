import logging
from typing import List
from fastapi import HTTPException, status
from datetime import datetime, timezone
from bson.errors import InvalidId
from beanie.odm.fields import PydanticObjectId

from app.models.finance import FuelLog, ExpenseLog
from app.schemas.finance import FuelLogCreate, ExpenseLogCreate, VehicleOperationalCost
from app.services.vehicle import VehicleService
from app.models.maintenance import Maintenance

logger = logging.getLogger(__name__)

class FinanceService:
    @staticmethod
    async def create_fuel_log(log_in: FuelLogCreate) -> FuelLog:
        logger.info(f"Adding fuel log for vehicle {log_in.vehicle_id}")
        await VehicleService.get_vehicle(str(log_in.vehicle_id))  # Validates existence
        
        fuel_log = FuelLog(**log_in.model_dump())
        await fuel_log.insert()
        logger.info(f"Created FuelLog ID {fuel_log.id}")
        return fuel_log

    @staticmethod
    async def get_fuel_logs(skip: int = 0, limit: int = 100) -> List[FuelLog]:
        return await FuelLog.find_all().skip(skip).limit(limit).to_list()

    @staticmethod
    async def create_expense_log(expense_in: ExpenseLogCreate) -> ExpenseLog:
        logger.info(f"Adding expense log for vehicle {expense_in.vehicle_id}")
        await VehicleService.get_vehicle(str(expense_in.vehicle_id))  # Validates existence
        
        expense_log = ExpenseLog(**expense_in.model_dump())
        await expense_log.insert()
        logger.info(f"Created ExpenseLog ID {expense_log.id}")
        return expense_log

    @staticmethod
    async def get_expense_logs(skip: int = 0, limit: int = 100) -> List[ExpenseLog]:
        return await ExpenseLog.find_all().skip(skip).limit(limit).to_list()

    @staticmethod
    async def get_vehicle_operational_cost(vehicle_id: str) -> VehicleOperationalCost:
        logger.info(f"Calculating operational cost for vehicle {vehicle_id}")
        try:
            obj_id = PydanticObjectId(vehicle_id)
        except InvalidId:
            raise HTTPException(status_code=400, detail="Invalid vehicle ID format")

        await VehicleService.get_vehicle(vehicle_id)  # Validate exists

        # Calculate Fuel
        fuel_logs = await FuelLog.find(FuelLog.vehicle_id == obj_id).to_list()
        total_fuel = sum(log.cost for log in fuel_logs)

        # Calculate Expenses
        expense_logs = await ExpenseLog.find(ExpenseLog.vehicle_id == obj_id).to_list()
        total_expenses = sum(log.amount for log in expense_logs)

        # Calculate Maintenance
        maintenance_logs = await Maintenance.find(Maintenance.vehicle_id == obj_id).to_list()
        total_maintenance = sum(log.cost for log in maintenance_logs if log.cost is not None)

        return VehicleOperationalCost(
            vehicle_id=vehicle_id,
            total_fuel_cost=total_fuel,
            total_maintenance_cost=total_maintenance,
            total_expense_amount=total_expenses,
            grand_total=total_fuel + total_maintenance + total_expenses
        )
