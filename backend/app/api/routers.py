from fastapi import APIRouter

api_router = APIRouter()

# Placeholder routers
from .endpoints import auth, vehicles, drivers, trips, maintenance, fuel, reports, settings

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(vehicles.router, prefix="/vehicles", tags=["vehicles"])
api_router.include_router(drivers.router, prefix="/drivers", tags=["drivers"])
api_router.include_router(trips.router, prefix="/trips", tags=["trips"])
api_router.include_router(maintenance.router, prefix="/maintenance", tags=["maintenance"])
api_router.include_router(fuel.router, prefix="/fuel", tags=["fuel"])
api_router.include_router(reports.router, prefix="/reports", tags=["reports"])
api_router.include_router(settings.router, prefix="/settings", tags=["settings"])
