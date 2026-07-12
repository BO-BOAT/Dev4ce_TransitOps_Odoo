import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

async def check_db():
    client = AsyncIOMotorClient('mongodb://localhost:27017/')
    db = client.get_database('transitops')
    collections = await db.list_collection_names()
    print('Collections:', collections)
    
    users = await db['users'].find().to_list(length=10)
    if not users:
        print('No users found in User collection.')
    for user in users:
        print(f"User: {user.get('email')}, Role: {user.get('role')}, Hashed Pass: {user.get('hashed_password')}")
    
    client.close()

asyncio.run(check_db())
