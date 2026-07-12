from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "TransitOps"
    CORS_ORIGINS: list[str] = ["http://localhost:5173", "http://localhost:3000"]
    MONGODB_URL: str = "mongodb://localhost:27017/transitops"
    SECRET_KEY: str = "placeholder_secret_key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env"

settings = Settings()
