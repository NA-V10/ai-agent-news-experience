import React, { useMemo, useState } from "react";
import Feed from "./components/Feed";
import ProfileSelector from "./components/ProfileSelector";

const personas = {
  student: {
    label: "Student",
    eyebrow: "Learn fast",
    description:
      "Break down complex AI developments into clear takeaways and practical context.",
    accent: "Blueprints, explainers, and why-it-matters summaries."
  },
  investor: {
    label: "Investor",
    eyebrow: "Track the signals",
    description:
      "Surface market-moving stories, momentum shifts, and the business angle behind headlines.",
    accent: "Funding, valuation, regulation, and competitive movement."
  },
  founder: {
    label: "Founder",
    eyebrow: "Build with urgency",
    description:
      "Spot product opportunities, platform changes, and strategic moves shaping the AI race.",
    accent: "Distribution, product strategy, and execution-focused insights."
  }
};

export default function App() {
  const [userType, setUserType] = useState("student");
  const activePersona = useMemo(
    () => personas[userType] || personas.student,
    [userType]
  );

  return (
    <main className="app-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Personalized AI intelligence</p>
          <h1>AI Newsroom that adapts to how you think and work.</h1>
          <p className="hero-text">
            Your backend is already doing the heavy lifting. This frontend turns
            it into a modern briefing desk with profile-aware storytelling,
            cleaner hierarchy, and better actions around each article.
          </p>

          <div className="hero-stats">
            <div className="stat-card">
              <span className="stat-label">Active lens</span>
              <strong>{activePersona.label}</strong>
            </div>
            <div className="stat-card">
              <span className="stat-label">Current focus</span>
              <strong>{activePersona.accent}</strong>
            </div>
          </div>
        </div>

        <aside className="hero-panel">
          <p className="panel-kicker">{activePersona.eyebrow}</p>
          <h2>{activePersona.label} brief</h2>
          <p>{activePersona.description}</p>
          <div className="panel-badge">
            Curated summaries, translation, and instant video generation.
          </div>
        </aside>
      </section>

      <section className="controls-section">
        <div className="section-heading">
          <p className="eyebrow">Choose your perspective</p>
          <h2>Switch the newsroom persona</h2>
        </div>
        <ProfileSelector userType={userType} setUserType={setUserType} />
      </section>

      <section className="feed-section">
        <div className="section-heading">
          <p className="eyebrow">Today&apos;s stream</p>
          <h2>Stories tailored for {activePersona.label.toLowerCase()}s</h2>
        </div>
        <Feed userType={userType} persona={activePersona} />
      </section>
    </main>
  );
}
