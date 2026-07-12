from app.models.vehicle import Vehicle
from app.schemas.vehicle import VehicleStatus
from app.models.driver import Driver
from app.schemas.driver import DriverStatus
from app.models.trip import Trip
from app.schemas.trip import TripStatus
from app.models.finance import FuelLog, ExpenseLog
from app.models.maintenance import Maintenance

from app.schemas.dashboard import (
    FleetStats, DriverStats, TripStats, FinanceStats, KPIStats, DashboardResponse
)

class DashboardService:
    @staticmethod
    async def get_dashboard_stats() -> DashboardResponse:
        # Fleet Stats
        total_vehicles = await Vehicle.find_all().count()
        available_vehicles = await Vehicle.find(Vehicle.status == VehicleStatus.available).count()
        vehicles_on_trip = await Vehicle.find(Vehicle.status == VehicleStatus.on_trip).count()
        vehicles_in_shop = await Vehicle.find(Vehicle.status == VehicleStatus.in_shop).count()
        retired_vehicles = await Vehicle.find(Vehicle.status == VehicleStatus.retired).count()
        
        fleet_stats = FleetStats(
            total_vehicles=total_vehicles,
            available_vehicles=available_vehicles,
            vehicles_on_trip=vehicles_on_trip,
            vehicles_in_shop=vehicles_in_shop,
            retired_vehicles=retired_vehicles
        )

        # Driver Stats
        total_drivers = await Driver.find_all().count()
        available_drivers = await Driver.find(Driver.status == DriverStatus.available).count()
        drivers_on_trip = await Driver.find(Driver.status == DriverStatus.on_trip).count()
        suspended_drivers = await Driver.find(Driver.status == DriverStatus.suspended).count()
        
        driver_stats = DriverStats(
            total_drivers=total_drivers,
            available_drivers=available_drivers,
            drivers_on_trip=drivers_on_trip,
            suspended_drivers=suspended_drivers
        )

        # Trip Stats (Active = Dispatched)
        active_trips = await Trip.find(Trip.status == TripStatus.dispatched.value).count()
        completed_trips = await Trip.find(Trip.status == TripStatus.completed.value).count()
        cancelled_trips = await Trip.find(Trip.status == TripStatus.cancelled.value).count()
        
        trip_stats = TripStats(
            active_trips=active_trips,
            completed_trips=completed_trips,
            cancelled_trips=cancelled_trips
        )

        # Finance Stats
        fuel_logs = await FuelLog.find_all().to_list()
        total_fuel = sum(log.cost for log in fuel_logs)
        
        maintenance_logs = await Maintenance.find_all().to_list()
        total_maintenance = sum(log.cost for log in maintenance_logs if log.cost is not None)
        
        expense_logs = await ExpenseLog.find_all().to_list()
        total_expenses = sum(log.amount for log in expense_logs)
        
        total_operational = total_fuel + total_maintenance + total_expenses
        
        finance_stats = FinanceStats(
            total_fuel_cost=total_fuel,
            total_maintenance_cost=total_maintenance,
            total_operational_cost=total_operational
        )

        # KPIs
        utilization = (vehicles_on_trip / total_vehicles * 100) if total_vehicles > 0 else 0.0
        availability = (available_vehicles / total_vehicles * 100) if total_vehicles > 0 else 0.0
        
        kpi_stats = KPIStats(
            fleet_utilization_percent=round(utilization, 2),
            active_trip_count=active_trips,
            vehicle_availability_percent=round(availability, 2)
        )

        return DashboardResponse(
            fleet=fleet_stats,
            drivers=driver_stats,
            trips=trip_stats,
            finance=finance_stats,
            kpis=kpi_stats
        )
