import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      message: error?.message || "Unknown frontend error"
    };
  }

  componentDidCatch(error) {
    console.error("Frontend render error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="app-shell">
          <div className="status-panel error">
            <div>
              <strong>The frontend hit a render error.</strong>
              <p>{this.state.message}</p>
              <p>Open DevTools Console once and refresh to inspect the exact stack trace.</p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
