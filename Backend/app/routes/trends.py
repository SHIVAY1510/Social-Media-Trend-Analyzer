from fastapi import APIRouter, Depends, HTTPException
from urllib.parse import quote
import xml.etree.ElementTree as ET

import requests
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Trend
from ..schemas import TrendCreate, TrendResponse
from ..services.google_trends import get_google_trends

router = APIRouter(
    prefix="/api/trends",
    tags=["Trends"]
)


@router.get("/")
def get_all_trends(
    db: Session = Depends(get_db)
):
    trends = (
        db.query(Trend)
        .order_by(Trend.trend_score.desc())
        .all()
    )

    return trends


@router.get("/google")
def get_google_trending():
    response = requests.get(
        "https://trends.google.com/trending/rss?geo=IN",
        timeout=20,
    )
    response.raise_for_status()

    root = ET.fromstring(response.content)
    items = []
    for index, item in enumerate(root.findall(".//item")):
        title = item.findtext("title", "Unknown trend").strip()
        traffic = item.findtext("{https://trends.google.com/trending/rss}approx_traffic", "Live").strip()
        traffic_value = int("".join(character for character in traffic if character.isdigit()) or "0")
        status = "Viral" if traffic_value >= 1000 else "Rising" if traffic_value >= 500 else "Emerging"
        items.append({
            "id": f"google-{index}-{title.lower().replace(' ', '-')}",
            "keyword": title,
            "category": "Google Trends",
            "trend_score": min(99, max(50, round((traffic_value or 1000) ** 0.2 * 20))),
            "growth": min(99, max(35, round((traffic_value or 1000) ** 0.18 * 18))),
            "sentiment": 75,
            "opportunity": 80,
            "status": status,
            "source": "google_trends",
            "search_volume": traffic_value,
            "description": f"Trending on Google Search with approximately {traffic} searches.",
            "trend_url": f"https://trends.google.com/trends/explore?q={quote(title)}&geo=IN",
        })

    return items


@router.get("/search")
def search_google_trend(keyword: str):
    try:
        result = get_google_trends(keyword)
        traffic = f"{round(result['average'])} average interest"
        return [{
            "id": f"google-search-{keyword.lower().replace(' ', '-')}",
            "keyword": keyword,
            "name": keyword,
            "category": "Google Trends",
            "trend_score": round(min(99, max(0, result["average"])), 2),
            "growth": round(max(0, min(99, result["growth"])), 2),
            "sentiment": 75,
            "opportunity": 80,
            "status": "Rising" if result["growth"] >= 30 else "Emerging",
            "source": "google_trends",
            "search_volume": result["average"],
            "description": f"Google Trends interest for '{keyword}' over the last 3 months.",
            "trend_url": f"https://trends.google.com/trends/explore?q={quote(keyword)}&geo=IN",
            "google_trends": result,
            "traffic_label": traffic,
        }]
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))


@router.get("/{trend_id}")
def get_trend(
    trend_id: int,
    db: Session = Depends(get_db)
):
    trend = (
        db.query(Trend)
        .filter(Trend.id == trend_id)
        .first()
    )

    if not trend:
        raise HTTPException(
            status_code=404,
            detail="Trend not found"
        )

    return trend


@router.post("/")
def create_trend(
    trend_data: TrendCreate,
    db: Session = Depends(get_db)
):
    trend = Trend(**trend_data.model_dump())

    db.add(trend)
    db.commit()
    db.refresh(trend)

    return trend


@router.get("/google/{keyword}")
def google_trend(
    keyword: str,
    db: Session = Depends(get_db)
):
    try:
        result = get_google_trends(keyword)

        growth = result["growth"]

        trend_score = min(
            100,
            max(0, result["average"] + growth * 0.3)
        )

        opportunity = min(
            100,
            max(0, trend_score + 10)
        )

        if growth >= 100:
            status = "Exploding"
        elif growth >= 30:
            status = "Rising"
        else:
            status = "Stable"

        trend = Trend(
            keyword=keyword,
            category="General",
            trend_score=round(trend_score, 2),
            growth=round(growth, 2),
            sentiment=0,
            opportunity=round(opportunity, 2),
            status=status,
            source="google_trends"
        )

        db.add(trend)
        db.commit()
        db.refresh(trend)

        return {
            "trend": trend,
            "google_trends": result
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )