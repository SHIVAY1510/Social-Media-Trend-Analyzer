import {
  ArrowLeft,
  Bookmark,
  Brain,
  MessageCircle,
  TrendingUp,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import TrendChart from "../components/TrendChart";

export default function TrendDetails({
  trend,
  onNavigate,
  onLogout,
  saved,
  toggleSaved,
}) {
  const currentTrend = trend || {
      id: 1,
      name: "AI Productivity",
      category: "Technology",
      growth: 87,
      score: 92,
      opportunity: 88,
      sentiment: 82,
      engagement: "1.8M",
      status: "Viral",
    };

  const isSaved = saved.some(
    (item) => item.id === currentTrend.id
  );

  return (
    <div className="dashboard-layout">
      <Sidebar
        page="trends"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <main className="dashboard-content">
        <button
          className="back-dashboard"
          onClick={() => onNavigate("trends")}
        >
          <ArrowLeft size={17} />
          Back to Trends
        </button>

        <div className="details-title">
          <div>
            <span className="eyebrow">
              {currentTrend.category.toUpperCase()}
            </span>

            <h1>{currentTrend.name}</h1>

            <p>
              {currentTrend.description ||
                "Live trend intelligence and growth analysis."}
            </p>
          </div>

          <button
            className={`save-large ${
              isSaved ? "active" : ""
            }`}
            onClick={() => toggleSaved(currentTrend)}
          >
            <Bookmark size={18} />
            {isSaved ? "Saved" : "Save Trend"}
          </button>
        </div>

        <a
          className="google-trends-link"
          href={currentTrend.trendUrl || `https://trends.google.com/trends/explore?q=${encodeURIComponent(currentTrend.name)}&geo=IN`}
          target="_blank"
          rel="noreferrer"
        >
          Open Google Trends search
        </a>

        <div className="details-stats">
          <Metric
            title="Trend Score"
            value={`${currentTrend.score}/100`}
            icon={<TrendingUp />}
          />

          <Metric
            title="Growth"
            value={`+${currentTrend.growth}%`}
            icon={<TrendingUp />}
          />

          <Metric
            title="Engagement"
            value={currentTrend.engagement}
            icon={<MessageCircle />}
          />

          <Metric
            title="Sentiment"
            value={`${currentTrend.sentiment}%`}
            icon={<Brain />}
          />
        </div>

        <div className="details-grid">
          <div className="panel">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">
                  MOMENTUM
                </span>
                <h2>Trend Growth</h2>
              </div>
            </div>

            <TrendChart />
          </div>

          <div className="panel">
            <span className="eyebrow">
              OPPORTUNITY
            </span>

            <h2>Opportunity Score</h2>

            <div className="big-score">
              {currentTrend.opportunity}
              <span>/100</span>
            </div>

            <p>
              This trend has strong potential for creators,
              brands and businesses.
            </p>

            <button
              className="primary-btn full"
              onClick={() =>
                onNavigate("insights", currentTrend)
              }
            >
              <Brain size={18} />
              Generate AI Insights
            </button>
          </div>
        </div>

        <div className="panel explanation">
          <div className="ai-title">
            <div className="ai-icon">
              <Brain size={20} />
            </div>

            <div>
              <span className="eyebrow">
                AI ANALYSIS
              </span>

              <h2>Why is this trending?</h2>
            </div>
          </div>

          <p>
            {currentTrend.description ||
              `Conversations around ${currentTrend.name} are showing
              growing audience interest and short-term momentum.`}
          </p>
        </div>
      </main>
    </div>
  );
}

function Metric({ title, value, icon }) {
  return (
    <div className="detail-metric">
      <div>{icon}</div>
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}