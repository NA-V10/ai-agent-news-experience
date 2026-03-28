import React from "react";

const options = [
  {
    value: "student",
    icon: "ST",
    title: "Student",
    subtitle: "Concept clarity and fast understanding"
  },
  {
    value: "investor",
    icon: "IV",
    title: "Investor",
    subtitle: "Signals, risk, momentum, and market impact"
  },
  {
    value: "founder",
    icon: "FD",
    title: "Founder",
    subtitle: "Product angles, distribution, and execution"
  }
];

export default function ProfileSelector({ userType, setUserType }) {
  return (
    <div className="profile-grid">
      {options.map((option) => {
        const isActive = option.value === userType;

        return (
          <button
            key={option.value}
            type="button"
            className={`profile-card${isActive ? " active" : ""}`}
            onClick={() => setUserType(option.value)}
          >
            <span className="profile-icon">{option.icon}</span>
            <span className="profile-title">{option.title}</span>
            <span className="profile-subtitle">{option.subtitle}</span>
          </button>
        );
      })}
    </div>
  );
}
