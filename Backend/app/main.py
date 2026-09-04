from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine, Base
from . import models
from .routes.trends import router as trends_router

app = FastAPI(
    title="Social Media Trend Analyzer",
    version="1.0.0"
)

# Create tables if they don't already exist
Base.metadata.create_all(bind=engine)


# React frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(trends_router)


@app.get("/")
def root():
    return {
        "message": "Social Media Trend Analyzer API",
        "status": "running"
    }