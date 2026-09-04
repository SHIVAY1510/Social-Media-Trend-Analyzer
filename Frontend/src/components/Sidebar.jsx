import {
  Activity,
  BarChart3,
  Brain,
  ChevronRight,
  LogOut,
  Settings,
  Star,
  TrendingUp,
} from "lucide-react";

export default function Sidebar({
  page,
  onNavigate,
  onLogout,
}) {
  const menu = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Activity,
    },
    {
      id: "trends",
      label: "Discover Trends",
      icon: TrendingUp,
    },
    {
      id: "insights",
      label: "AI Insights",
      icon: Brain,
    },
    {
      id: "forecast",
      label: "Trend Forecast",
      icon: BarChart3,
    },
    {
      id: "saved",
      label: "Saved Trends",
      icon: Star,
    },
  ];

  return (
    <aside className="sidebar">
      <div
        className="sidebar-logo"
        onClick={() => onNavigate("dashboard")}
      >
        <div className="logo-icon">
          <BarChart3 size={21} />
        </div>

        <div>
          <strong>TrendPulse</strong>
          <span>AI</span>
        </div>
      </div>

      <div className="menu-label">ANALYTICS</div>

      <div className="sidebar-menu">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              className={`menu-item ${
                page === item.id ? "active" : ""
              }`}
              onClick={() => onNavigate(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>

              {page === item.id && (
                <ChevronRight size={15} className="menu-arrow" />
              )}
            </button>
          );
        })}
      </div>

      <div className="sidebar-bottom">
        <div className="menu-label">ACCOUNT</div>

        <button
          className={`menu-item ${page === "settings" ? "active" : ""}`}
          onClick={() => onNavigate("settings")}
        >
          <Settings size={18} />
          <span>Settings</span>

          {page === "settings" && (
            <ChevronRight size={15} className="menu-arrow" />
          )}
        </button>

        <button className="menu-item logout" onClick={onLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}