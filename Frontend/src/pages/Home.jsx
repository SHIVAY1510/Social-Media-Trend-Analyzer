import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  Globe,
  Search,
  TrendingUp,
  Zap,
} from "lucide-react";

export default function Home({ onNavigate }) {
  return (
    <div className="landing">
      <nav className="landing-nav">
        <div
          className="brand"
          onClick={() => onNavigate("home")}
        >
          <div className="logo-icon">
            <BarChart3 size={21} />
          </div>

          <span>TrendPulse AI</span>
        </div>

        <div className="landing-links">
          <a href="#features">Features</a>
          <a href="#how">How It Works</a>
          <a href="#platforms">Platforms</a>

          <button
            className="nav-login"
            onClick={() => onNavigate("login")}
          >
            Login
          </button>

          <button
            className="nav-signup"
            onClick={() => onNavigate("signup")}
          >
            Get Started
          </button>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="hero-left">
          <div className="hero-badge">
            <Zap size={15} />
            AI-POWERED SOCIAL INTELLIGENCE
          </div>

          <h1>
            Know What's
            <span> Trending </span>
            Before Everyone Else.
          </h1>

          <p>
            TrendPulse AI discovers emerging social media trends,
            explains why they're growing, and tells you what to do
            next.
          </p>

          <div className="hero-actions">
            <button
              className="primary-btn"
              onClick={() => onNavigate("signup")}
            >
              Start Analyzing
              <ArrowRight size={18} />
            </button>

            <button
              className="outline-btn"
              onClick={() => onNavigate("login")}
            >
              Explore Dashboard
            </button>
          </div>

          <div className="hero-points">
            <span>
              <CheckCircle2 size={15} />
              Real-time signals
            </span>

            <span>
              <CheckCircle2 size={15} />
              AI explanations
            </span>

            <span>
              <CheckCircle2 size={15} />
              Trend forecasting
            </span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-card floating-one">
            <TrendingUp size={17} />
            <div>
              <small>Growth</small>
              <strong>+87%</strong>
            </div>
          </div>

          <div className="dashboard-mockup">
            <div className="mock-header">
              <div>
                <small>LIVE ANALYSIS</small>
                <h3>Trend Intelligence</h3>
              </div>

              <span className="live-dot">● LIVE</span>
            </div>

            <div className="mock-trend">
              <div className="mock-icon">
                <Brain size={21} />
              </div>

              <div>
                <strong>AI Productivity</strong>
                <small>Technology</small>
              </div>

              <b>92</b>
            </div>

            <div className="mock-chart">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>

            <div className="mock-bottom">
              <div>
                <small>Trend Score</small>
                <strong>92/100</strong>
              </div>

              <div>
                <small>Opportunity</small>
                <strong>88%</strong>
              </div>

              <div>
                <small>Sentiment</small>
                <strong>Positive</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="detect-section">
        <div className="section-heading">
          <span>ONE PLATFORM</span>
          <h2>Detect → Explain → Act</h2>
          <p>
            Turn social media noise into actionable intelligence.
          </p>
        </div>

        <div className="process-grid">
          <Process
            number="01"
            icon={<Search />}
            title="Detect"
            text="Discover emerging topics and fast-growing conversations."
          />

          <Process
            number="02"
            icon={<Brain />}
            title="Explain"
            text="AI analyzes sentiment, themes and the reasons behind growth."
          />

          <Process
            number="03"
            icon={<Zap />}
            title="Act"
            text="Get recommendations and identify the best opportunities."
          />
        </div>
      </section>

      <section id="features" className="features-section">
        <div className="section-heading">
          <span>POWERFUL ANALYTICS</span>
          <h2>Everything You Need to Understand Trends</h2>
        </div>

        <div className="feature-grid-large">
          <Feature
            icon={<TrendingUp />}
            title="Trend Detection"
            text="Identify emerging, rising, viral and declining trends."
          />

          <Feature
            icon={<BarChart3 />}
            title="Trend Score"
            text="Measure momentum using growth, engagement and velocity."
            onClick={() => onNavigate("forecast")}
          />

          <Feature
            icon={<Brain />}
            title="AI Insights"
            text="Understand why a trend is happening and what's driving it."
            onClick={() => onNavigate("insights")}
          />

          <Feature
            icon={<Globe />}
            title="Platform Analysis"
            text="Compare trend activity across different social platforms."
          />
        </div>
      </section>

      <section id="how" className="cta-section">
        <h2>Turn Trends Into Opportunities.</h2>
        <p>
          Stop guessing what your audience wants. Start using data.
        </p>

        <button
          className="primary-btn"
          onClick={() => onNavigate("signup")}
        >
          Create Free Account
          <ArrowRight size={18} />
        </button>
      </section>
    </div>
  );
}

function Process({ number, icon, title, text }) {
  return (
    <div className="process-card">
      <span>{number}</span>

      <div className="process-icon">{icon}</div>

      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Feature({ icon, title, text, onClick }) {
  return (
    <div
      className={`feature-box ${onClick ? "clickable" : ""}`}
      onClick={onClick}
      onKeyDown={(event) => {
        if (onClick && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onClick();
        }
      }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}