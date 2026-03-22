import React, { useState } from "react";
import axios from "axios";

export default function NewsCard({ article }) {
  const [translated, setTranslated] = useState("");

  const translate = async () => {
    const res = await axios.get(
      `http://localhost:8000/news/translate?text=${article.summary}&lang=Tamil`
    );
    setTranslated(res.data.translated);
  };

  const video = () => {
    window.open(
      `http://localhost:8000/news/video?text=${article.summary}`,
      "_blank"
    );
  };

  return (
    <div
      style={{
        background: "linear-gradient(145deg, #1e293b, #0f172a)",
        padding: "20px",
        borderRadius: "16px",
        marginBottom: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        transition: "all 0.3s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
        e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.4)";
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>{article.title}</h3>

      <p style={{ opacity: 0.9 }}>{article.summary}</p>

      {translated && (
        <p style={{ color: "#38bdf8", marginTop: "10px" }}>
          🌍 {translated}
        </p>
      )}

      <div style={{ marginTop: "15px" }}>
        <button
          onClick={translate}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "none",
            background: "#38bdf8",
            color: "black",
            cursor: "pointer"
          }}
        >
          🌍 Translate
        </button>

        <button
          onClick={video}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "none",
            background: "#22c55e",
            color: "black",
            marginLeft: "10px",
            cursor: "pointer"
          }}
        >
          🎥 Video
        </button>
      </div>

      <a
        href={article.url}
        target="_blank"
        style={{ display: "block", marginTop: "10px", color: "#94a3b8" }}
      >
        Read full article →
      </a>
    </div>
  );
}