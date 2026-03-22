import React, { useEffect, useState } from "react";
import { getNews } from "../services/api";
import NewsCard from "./NewsCard";

export default function Feed({ userType }) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getNews(userType).then(setNews);
  }, [userType]);

  if (news.length === 0) {
    return <p style={{ opacity: 0.6 }}>Loading personalized news...</p>;
  }

  return (
    <div style={{
      maxWidth: "800px",
      margin: "auto"
    }}>
      {news.map((n, i) => (
        <NewsCard key={i} article={n} />
      ))}
    </div>
  );
}