from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime

from .database import Base


class Trend(Base):
    __tablename__ = "trends"

    id = Column(Integer, primary_key=True, index=True)

    keyword = Column(
        String(255),
        nullable=False,
        index=True
    )

    category = Column(
        String(100),
        nullable=True
    )

    trend_score = Column(
        Float,
        default=0
    )

    growth = Column(
        Float,
        default=0
    )

    sentiment = Column(
        Float,
        default=0
    )

    opportunity = Column(
        Float,
        default=0
    )

    status = Column(
        String(50),
        default="Rising"
    )

    source = Column(
        String(50),
        default="google_trends"
    )

    search_volume = Column(
        Float,
        default=0
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )