import React from "react";

export default function ProfileSelector({ setUserType }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <select
        onChange={(e) => setUserType(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "10px",
          background: "#1e293b",
          color: "white",
          border: "none",
          outline: "none"
        }}
      >
        <option value="student">🎓 Student</option>
        <option value="investor">📈 Investor</option>
        <option value="founder">🚀 Founder</option>
      </select>
    </div>
  );
}