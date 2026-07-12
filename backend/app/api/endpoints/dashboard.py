from fastapi import APIRouter, Depends
from app.api.deps import get_current_active_user
from app.models.user import User
from app.schemas.dashboard import DashboardResponse
from app.services.dashboard import DashboardService

router = APIRouter()

@router.get("/", response_model=DashboardResponse)
async def get_dashboard(current_user: User = Depends(get_current_active_user)):
    """Retrieve dynamic aggregated statistics for the dashboard."""
    return await DashboardService.get_dashboard_stats()
