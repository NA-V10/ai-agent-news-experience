import React, { useMemo, useState } from "react";
import { getVideoUrl, translateSummary } from "../services/api";

export default function NewsCard({ article, index, persona }) {
  const [translated, setTranslated] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [translateError, setTranslateError] = useState("");

  const storyNumber = useMemo(
    () => String(index + 1).padStart(2, "0"),
    [index]
  );

  async function handleTranslate() {
    if (translated) {
      setTranslated("");
      setTranslateError("");
      return;
    }

    setIsTranslating(true);
    setTranslateError("");

    try {
      const result = await translateSummary(article.summary, "Tamil");
      setTranslated(result);
    } catch (err) {
      setTranslateError("Translation is unavailable right now.");
    } finally {
      setIsTranslating(false);
    }
  }

  function handleVideo() {
    window.open(getVideoUrl(article.summary), "_blank", "noopener,noreferrer");
  }

  return (
    <article className="news-card">
      <div className="news-card-top">
        <span className="story-number">{storyNumber}</span>
        <span className="story-tag">{persona.label} lens</span>
      </div>

      <h3>{article.title}</h3>
      <p className="story-summary">{article.summary}</p>

      {translated ? (
        <div className="translation-box">
          <span className="translation-label">Tamil translation</span>
          <p>{translated}</p>
        </div>
      ) : null}

      {translateError ? <p className="inline-error">{translateError}</p> : null}

      <div className="card-actions">
        <button
          type="button"
          className="primary-button"
          onClick={handleTranslate}
          disabled={isTranslating}
        >
          {isTranslating ? "Translating..." : translated ? "Hide translation" : "Translate summary"}
        </button>

        <button
          type="button"
          className="secondary-button"
          onClick={handleVideo}
        >
          Generate video
        </button>
      </div>

      <a
        className="story-link"
        href={article.url}
        target="_blank"
        rel="noreferrer"
      >
        Read full article
      </a>
    </article>
  );
}
