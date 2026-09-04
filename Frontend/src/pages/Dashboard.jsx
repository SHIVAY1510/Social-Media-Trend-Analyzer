import {
  Brain,
  Flame,
  TrendingUp,
  Users,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import TrendCard from "../components/TrendCard";
import TrendChart from "../components/TrendChart";

export default function Dashboard({
  onNavigate,
  onLogout,
  saved,
  trends,
  trendsLoading,
  trendsError,
}) {
  return (
    <div className="dashboard-layout">
      <Sidebar
        page="dashboard"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <main className="dashboard-content">
        <header className="page-header">
          <div>
            <span className="eyebrow">
              SOCIAL INTELLIGENCE
            </span>

            <h1>Good afternoon 👋</h1>

            <p>
              Here's what's happening across social media.
            </p>
          </div>

          <div className="live-status">
            <span></span>
            Data Updated Live
          </div>
        </header>

        <section className="stats-grid">
          <StatCard
            icon={<Flame />}
            title="Trending Topics"
            value="128"
            change="+18.4%"
            description="this week"
          />

          <StatCard
            icon={<TrendingUp />}
            title="Emerging Trends"
            value="24"
            change="+12.7%"
            description="this week"
          />

          <StatCard
            icon={<Brain />}
            title="AI Insights"
            value="67"
            change="+24.1%"
            description="generated"
            onClick={() => onNavigate("insights")}
          />

          <StatCard
            icon={<Users />}
            title="Audience Signals"
            value="2.4M"
            change="+16.2%"
            description="engagement"
          />
        </section>

        <section className="dashboard-grid">
          <div className="panel trend-panel">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">
                  TREND MOMENTUM
                </span>

                <h2>Social Media Activity</h2>
              </div>

              <select>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
            </div>

            <TrendChart />
          </div>

          <div className="panel score-panel">
            <span className="eyebrow">TREND HEALTH</span>

            <h2>Overall Trend Score</h2>

            <div className="score-circle">
              <strong>81</strong>
              <span>/100</span>
            </div>

            <p>
              Social activity is showing strong upward
              momentum.
            </p>

            <div className="score-bar">
              <span style={{ width: "81%" }}></span>
            </div>

            <div className="score-labels">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>
        </section>

        <section className="trends-area">
          <div className="section-row">
            <div>
              <span className="eyebrow">DISCOVERY</span>
              <h2>Live Google Trends</h2>
            </div>

            <button
              className="text-btn"
              onClick={() => onNavigate("trends")}
            >
              View All →
            </button>
          </div>

          {trendsLoading && <p className="trend-source-message">Loading live Google Trends...</p>}
          {!trendsLoading && trendsError && <p className="trend-source-message error">{trendsError}</p>}
          {!trendsLoading && !trendsError && <div className="trend-grid">
            {trends.slice(0, 4).map((trend) => (
              <TrendCard
                key={trend.id}
                trend={trend}
                saved={saved}
                toggleSaved={() => {}}
                onClick={(item) =>
                  onNavigate("details", item)
                }
              />
            ))}
          </div>}
        </section>
      </main>
    </div>
  );
}