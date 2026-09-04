const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8000";
async function request(endpoint, options = {}) {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }
  );

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}

function normalizeTrend(trend) {
  return {
    ...trend,
    name: trend.name || trend.keyword,
    score: trend.score ?? trend.trend_score,
    engagement: trend.engagement || `${trend.search_volume || 0}`,
    trendUrl: trend.trendUrl || trend.trend_url,
  };
}

export const api = {
  getGoogleTrends: () =>
    request("/api/trends/google").then((items) =>
      items.map(normalizeTrend)
    ),

  getTrends: () =>
    request("/api/trends"),

  getTrend: (id) =>
    request(`/api/trends/${id}`),

  searchTrends: (query) =>
    request(
      `/api/trends/search?keyword=${encodeURIComponent(query)}`
    ).then((items) => items.map(normalizeTrend)),

  generateInsight: (id) =>
    request(`/api/trends/${id}/explain`, {
      method: "POST",
    }),

  generateRecommendation: (id) =>
    request(`/api/trends/${id}/recommend`, {
      method: "POST",
    }),
};