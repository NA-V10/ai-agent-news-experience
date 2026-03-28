import React, { useEffect, useState } from "react";
import { getNews } from "../services/api";
import NewsCard from "./NewsCard";

export default function Feed({ userType, persona }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function normalizeArticles(items) {
    if (!Array.isArray(items)) {
      return [];
    }

    return items.map((item, index) => ({
      title: item?.title || `AI story ${index + 1}`,
      summary: item?.summary || item?.description || "Summary unavailable.",
      url: item?.url || "#"
    }));
  }

  useEffect(() => {
    let active = true;

    async function loadNews() {
      setLoading(true);
      setError("");

      try {
        const items = await getNews(userType);
        if (active) {
          setNews(normalizeArticles(items));
        }
      } catch (err) {
        if (active) {
          setError("We couldn't load the news feed right now.");
          setNews([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadNews();

    return () => {
      active = false;
    };
  }, [userType]);

  if (loading) {
    return (
      <div className="status-panel">
        <div className="loading-orb" />
        <div>
          <strong>Preparing your {persona.label.toLowerCase()} briefing</strong>
          <p>Pulling the latest personalized stories from the backend.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-panel error">
        <div>
          <strong>{error}</strong>
          <p>Try switching personas or refreshing once the API is available.</p>
        </div>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="status-panel">
        <div>
          <strong>No stories matched this persona yet.</strong>
          <p>The backend responded, but there were no articles to display.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="feed-grid">
      {news.map((article, index) => (
        <NewsCard
          key={`${article.url}-${index}`}
          article={article}
          index={index}
          persona={persona}
        />
      ))}
    </div>
  );
}
