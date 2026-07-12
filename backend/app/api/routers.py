from fastapi import APIRouter

api_router = APIRouter()

# Placeholder routers
from .endpoints import auth, vehicles, drivers, trips, maintenance, finance, reports, settings, dashboard

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(vehicles.router, prefix="/vehicles", tags=["vehicles"])
api_router.include_router(drivers.router, prefix="/drivers", tags=["drivers"])
api_router.include_router(trips.router, prefix="/trips", tags=["trips"])
api_router.include_router(maintenance.router, prefix="/maintenance", tags=["maintenance"])
api_router.include_router(finance.router, prefix="/finance", tags=["finance"])
api_router.include_router(reports.router, prefix="/reports", tags=["reports"])
api_router.include_router(settings.router, prefix="/settings", tags=["settings"])
