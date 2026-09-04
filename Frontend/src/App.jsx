import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Trends from "./pages/Trends";
import TrendDetails from "./pages/TrendDetails";
import AIInsights from "./pages/AIInsights";
import Forecast from "./pages/Forecast";
import SavedTrends from "./pages/SavedTrends";
import SettingsPage from "./pages/Settings";
import { api } from "./Services/api";

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedTrend, setSelectedTrend] = useState(null);
  const [saved, setSaved] = useState([]);
  const [trends, setTrends] = useState([]);
  const [trendsLoading, setTrendsLoading] = useState(true);
  const [trendsError, setTrendsError] = useState("");

  useEffect(() => {
    api.getGoogleTrends()
      .then((googleTrends) => {
        setTrends(googleTrends);
        setTrendsError("");
      })
      .catch(() => {
        setTrendsError("Google Trends could not be loaded.");
      })
      .finally(() => setTrendsLoading(false));
  }, []);

  const navigate = (newPage, trend = null) => {
    setSelectedTrend(trend);
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  const login = () => {
    setPage("dashboard");
  };

  const signup = () => {
    setPage("dashboard");
  };

  const logout = () => {
    setPage("home");
  };

  const toggleSaved = (trend) => {
    setSaved((current) => {
      const exists = current.some((item) => item.id === trend.id);

      if (exists) {
        return current.filter((item) => item.id !== trend.id);
      }

      return [...current, trend];
    });
  };

  if (page === "login") {
    return <Login onNavigate={navigate} onLogin={login} />;
  }

  if (page === "signup") {
    return <Signup onNavigate={navigate} onSignup={signup} />;
  }

  if (page === "dashboard") {
    return (
      <Dashboard
        onNavigate={navigate}
        onLogout={logout}
        saved={saved}
        trends={trends}
        trendsLoading={trendsLoading}
        trendsError={trendsError}
      />
    );
  }

  if (page === "trends") {
    return (
      <Trends
        onNavigate={navigate}
        onLogout={logout}
        saved={saved}
        toggleSaved={toggleSaved}
        trends={trends}
        trendsLoading={trendsLoading}
        trendsError={trendsError}
      />
    );
  }

  if (page === "details") {
    return (
      <TrendDetails
        trend={selectedTrend}
        onNavigate={navigate}
        onLogout={logout}
        saved={saved}
        toggleSaved={toggleSaved}
      />
    );
  }

  if (page === "insights") {
    return (
      <AIInsights
        trend={selectedTrend}
        onNavigate={navigate}
        onLogout={logout}
      />
    );
  }

  if (page === "forecast") {
    return (
      <Forecast
        trend={selectedTrend}
        onNavigate={navigate}
        onLogout={logout}
      />
    );
  }

  if (page === "saved") {
    return (
      <SavedTrends
        saved={saved}
        onNavigate={navigate}
        onLogout={logout}
        toggleSaved={toggleSaved}
      />
    );
  }

  if (page === "settings") {
    return (
      <SettingsPage
        onNavigate={navigate}
        onLogout={logout}
      />
    );
  }

  return <Home onNavigate={navigate} />;
}