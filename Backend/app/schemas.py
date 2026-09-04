from datetime import datetime

from pydantic import BaseModel


class TrendBase(BaseModel):
    keyword: str
    category: str | None = None
    trend_score: float = 0
    growth: float = 0
    sentiment: float = 0
    opportunity: float = 0
    status: str = "Rising"
    source: str = "google_trends"
    search_volume: float = 0


class TrendCreate(TrendBase):
    pass


class TrendResponse(TrendBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True