import { Bookmark, Star } from "lucide-react";

import Sidebar from "../components/Sidebar";
import TrendCard from "../components/TrendCard";

export default function SavedTrends({
  saved,
  onNavigate,
  onLogout,
  toggleSaved,
}) {
  return (
    <div className="dashboard-layout">
      <Sidebar
        page="saved"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <main className="dashboard-content">
        <header className="page-header">
          <div>
            <span className="eyebrow">WATCHLIST</span>
            <h1>Saved Trends</h1>
            <p>
              Keep track of trends you want to monitor.
            </p>
          </div>
        </header>

        {saved.length === 0 ? (
          <div className="empty-state">
            <div>
              <Bookmark size={30} />
            </div>

            <Star size={18} />

            <h2>No saved trends yet</h2>

            <p>
              Save interesting trends from the Discover
              Trends page.
            </p>

            <button
              className="primary-btn"
              onClick={() => onNavigate("trends")}
            >
              Discover Trends
            </button>
          </div>
        ) : (
          <div className="trend-grid">
            {saved.map((trend) => (
              <TrendCard
                key={trend.id}
                trend={trend}
                saved={saved}
                toggleSaved={toggleSaved}
                onClick={(item) =>
                  onNavigate("details", item)
                }
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}