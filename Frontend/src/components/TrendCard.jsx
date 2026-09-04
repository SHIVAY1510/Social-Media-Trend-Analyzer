import {
  Bookmark,
  Flame,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

export default function TrendCard({
  trend,
  onClick,
  saved,
  toggleSaved,
}) {
  const isSaved = saved?.some((item) => item.id === trend.id);

  const Icon =
    trend.status === "Declining"
      ? TrendingDown
      : trend.status === "Viral"
      ? Flame
      : TrendingUp;

  return (
    <div className="trend-card">
      <div className="trend-card-top">
        <div className="trend-category">
          <Icon size={17} />
          {trend.category}
        </div>

        <button
          className={`bookmark ${isSaved ? "saved" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleSaved(trend);
          }}
        >
          <Bookmark size={17} />
        </button>
      </div>

      <div
        className="trend-click"
        onClick={() => onClick(trend)}
      >
        <h3>{trend.name}</h3>

        <p>{trend.description}</p>

        <div className="trend-metrics">
          <div>
            <span>Growth</span>
            <strong>{trend.growth}%</strong>
          </div>

          <div>
            <span>Score</span>
            <strong>{trend.score}</strong>
          </div>

          <div>
            <span>Opportunity</span>
            <strong>{trend.opportunity}%</strong>
          </div>
        </div>

        <div className="trend-card-footer">
          <span className={`status ${trend.status.toLowerCase()}`}>
            {trend.status}
          </span>

          <span className="view-details">
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
}