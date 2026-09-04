import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import Sidebar from "../components/Sidebar";
import TrendCard from "../components/TrendCard";
import { api } from "../Services/api";

export default function Trends({
  onNavigate,
  onLogout,
  saved,
  toggleSaved,
  trends,
  trendsLoading,
  trendsError,
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    const query = search.trim();

    if (!query) {
      setSearchResults(null);
      return;
    }

    setSearching(true);
    try {
      setSearchResults(await api.searchTrends(query));
    } catch {
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const visibleTrends = searchResults || trends;
  const filtered = visibleTrends.filter((trend) => {
    const matchesSearch =
      trend.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || trend.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="dashboard-layout">
      <Sidebar
        page="trends"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <main className="dashboard-content">
        <header className="page-header">
          <div>
            <span className="eyebrow">DISCOVER</span>
            <h1>Trend Discovery</h1>
            <p>
              Find emerging conversations and opportunities.
            </p>
          </div>
        </header>

        <div className="filter-bar">
          <form className="search-input" onSubmit={handleSearch}>
            <Search size={18} />
            <input
              placeholder="Search trends..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" aria-label="Search Google Trends">
              {searching ? "..." : "Go"}
            </button>
          </form>

          <div className="filter-icon">
            <SlidersHorizontal size={18} />
          </div>

          {["All", "Emerging", "Rising", "Viral", "Declining"].map(
            (item) => (
              <button
                key={item}
                className={
                  filter === item ? "filter active" : "filter"
                }
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            )
          )}
        </div>

        {trendsLoading && <p className="trend-source-message">Loading live Google Trends...</p>}
        {!trendsLoading && trendsError && <p className="trend-source-message error">{trendsError}</p>}
        {!trendsLoading && !trendsError && filtered.length > 0 && (
          <div className="trend-grid large">
            {filtered.map((trend) => (
              <TrendCard
                key={trend.id}
                trend={trend}
                saved={saved}
                toggleSaved={toggleSaved}
                onClick={(item) => onNavigate("details", item)}
              />
            ))}
          </div>
        )}

        {!trendsLoading && !trendsError && filtered.length === 0 && (
          <div className="empty-state trends-empty-state">
            <h2>
              {filter === "Declining"
                ? "Declining data is unavailable"
                : `No ${filter.toLowerCase()} trends right now`}
            </h2>
            <p>
              {filter === "Declining"
                ? "Google's Trending RSS feed only reports rising search interest."
                : "Google Trends currently has live results in other categories."}
            </p>
            <button className="primary-btn" onClick={() => setFilter("All")}>
              Show live trends
            </button>
          </div>
        )}
      </main>
    </div>
  );
}