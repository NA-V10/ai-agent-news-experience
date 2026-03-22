import React from "react";
import { useState } from "react";
import Feed from "./components/Feed";
import ProfileSelector from "./components/ProfileSelector";

export default function App() {
  const [userType, setUserType] = useState("student");

  return (
    <div style={{
      background: "linear-gradient(135deg, #0f172a, #020617)",
      color: "white",
      minHeight: "100vh",
      padding: "30px",
      fontFamily: "Inter, sans-serif"
    }}>
      <h1 style={{
        fontSize: "32px",
        fontWeight: "bold",
        marginBottom: "20px"
      }}>
        🧠 AI Newsroom
      </h1>

      <ProfileSelector setUserType={setUserType} />
      <Feed userType={userType} />
    </div>
  );
}