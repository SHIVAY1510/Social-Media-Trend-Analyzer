import {
  ArrowUpRight,
  Brain,
  CalendarDays,
  TrendingUp,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import TrendChart from "../components/TrendChart";

export default function Forecast({
  trend,
  onNavigate,
  onLogout,
}) {
  const currentTrend = trend || {
    name: "AI Productivity",
    score: 92,
    growth: 87,
  };

  return (
    <div className="dashboard-layout">
      <Sidebar
        page="forecast"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <main className="dashboard-content">
        <header className="page-header">
          <div>
            <span className="eyebrow">PREDICTIVE ANALYTICS</span>
            <h1>Trend Forecast</h1>
            <p>
              Predict where social momentum could go next.
            </p>
          </div>
        </header>

        <div className="forecast-banner">
          <div className="forecast-icon">
            <Brain size={26} />
          </div>

          <div>
            <span>FORECASTING</span>
            <h2>{currentTrend.name}</h2>
          </div>

          <div className="forecast-direction">
            <ArrowUpRight size={20} />
            Rising
          </div>
        </div>

        <div className="forecast-stats">
          <div>
            <CalendarDays />
            <span>7-Day Prediction</span>
            <strong>+{Math.round(currentTrend.growth * 1.18)}%</strong>
          </div>

          <div>
            <TrendingUp />
            <span>Momentum</span>
            <strong>Strong</strong>
          </div>

          <div>
            <Brain />
            <span>Confidence</span>
            <strong>87%</strong>
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">PREDICTED MOMENTUM</span>
              <h2>7-Day Trend Forecast</h2>
            </div>
          </div>

          <TrendChart />
        </div>

        <div className="forecast-advice">
          <Brain size={21} />

          <div>
            <strong>AI Forecast Summary</strong>

            <p>
              The trend is currently showing strong momentum.
              If engagement velocity remains consistent, it
              may continue growing over the next several days.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}