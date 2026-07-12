from pydantic import BaseModel

class FleetStats(BaseModel):
    total_vehicles: int
    available_vehicles: int
    vehicles_on_trip: int
    vehicles_in_shop: int
    retired_vehicles: int

class DriverStats(BaseModel):
    total_drivers: int
    available_drivers: int
    drivers_on_trip: int
    suspended_drivers: int

class TripStats(BaseModel):
    active_trips: int
    completed_trips: int
    cancelled_trips: int

class FinanceStats(BaseModel):
    total_fuel_cost: float
    total_maintenance_cost: float
    total_operational_cost: float

class KPIStats(BaseModel):
    fleet_utilization_percent: float
    active_trip_count: int
    vehicle_availability_percent: float

class DashboardResponse(BaseModel):
    fleet: FleetStats
    drivers: DriverStats
    trips: TripStats
    finance: FinanceStats
    kpis: KPIStats
