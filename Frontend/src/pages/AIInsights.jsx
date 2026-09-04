import {
  ArrowLeft,
  Brain,
  Lightbulb,
  MessageSquare,
  Target,
} from "lucide-react";

import Sidebar from "../components/Sidebar";

export default function AIInsights({
  trend,
  onNavigate,
  onLogout,
}) {
  const currentTrend = trend || {
    name: "AI Productivity",
    score: 92,
    opportunity: 88,
  };

  return (
    <div className="dashboard-layout">
      <Sidebar
        page="insights"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <main className="dashboard-content">
        <button
          className="back-dashboard"
          onClick={() => onNavigate("dashboard")}
        >
          <ArrowLeft size={17} />
          Dashboard
        </button>

        <header className="page-header">
          <div>
            <span className="eyebrow">ARTIFICIAL INTELLIGENCE</span>
            <h1>AI Insights</h1>
            <p>
              Understand what's driving {currentTrend.name}.
            </p>
          </div>
        </header>

        <div className="ai-hero">
          <div className="ai-big-icon">
            <Brain size={32} />
          </div>

          <div>
            <span>AI ANALYSIS</span>
            <h2>{currentTrend.name}</h2>
            <p>
              Our analysis indicates strong growth momentum
              and high audience interest.
            </p>
          </div>
        </div>

        <div className="insight-grid">
          <Insight
            icon={<Lightbulb />}
            title="Why Is It Trending?"
            text={`${currentTrend.name} is gaining attention because of increasing conversations, strong engagement velocity and growing audience interest.`}
          />

          <Insight
            icon={<MessageSquare />}
            title="Audience Sentiment"
            text="Overall sentiment is positive. Audiences are showing strong curiosity and engagement around this topic."
          />

          <Insight
            icon={<Target />}
            title="What Should You Do?"
            text="Create timely, educational and useful content while the trend is still showing upward momentum."
          />
        </div>

        <div className="recommendation">
          <div className="recommendation-icon">
            <Brain size={21} />
          </div>

          <div>
            <span>AI RECOMMENDATION</span>

            <h3>
              Act while the opportunity score is high.
            </h3>

            <p>
              Focus on short-form educational content,
              practical examples and audience questions
              related to this trend.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function Insight({ icon, title, text }) {
  return (
    <div className="insight-card">
      <div className="insight-icon">{icon}</div>
      <span className="eyebrow">AI INSIGHT</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}