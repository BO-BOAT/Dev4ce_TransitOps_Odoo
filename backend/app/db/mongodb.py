from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.core.config import settings
from app.models.user import User

client = None

async def init_db():
    global client
    client = AsyncIOMotorClient(settings.MONGODB_URL)
    # Register models here
    await init_beanie(database=client.get_default_database(), document_models=[User])

async def close_mongo_connection():
    global client
    if client:
        client.close()
