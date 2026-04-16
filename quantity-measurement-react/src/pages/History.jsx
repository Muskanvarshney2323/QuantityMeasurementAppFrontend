import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../components/common/AppNavbar";
import HistoryTable from "../components/history/HistoryTable";
import useTheme from "../hooks/useTheme";
import { getCurrentUser } from "../services/authService";

function History() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [items, setItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    setIsAuthenticated(!!user);
  }, []);

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear all history? This cannot be undone.")) {
      setItems([]);
      localStorage.removeItem("calculationHistory");
    }
  };

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("calculationHistory");
    if (savedHistory) {
      try {
        setItems(JSON.parse(savedHistory));
      } catch (error) {
        console.error("Error loading history:", error);
      }
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="page-container">
        <AppNavbar theme={theme} toggleTheme={toggleTheme} />
        <div className="unauthorized-page">
          <div className="unauthorized-card">
            <h1>🔒 Login Required</h1>
            <p>To view your saved measurement history, you need to be logged in.</p>
            <p className="unauthorized-description">
              Sign up or log in to your account to access and manage your calculation history.
            </p>
            <div className="unauthorized-actions">
              <button 
                className="primary-btn btn-primary-large"
                onClick={() => navigate("/auth")}
              >
                Go to Login / Sign Up
              </button>
              <button 
                className="secondary-btn btn-secondary-large"
                onClick={() => navigate("/dashboard")}
              >
                ← Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <AppNavbar theme={theme} toggleTheme={toggleTheme} />

      <div className="history-page">
        <div className="history-header">
          <div>
            <h1>📋 Your Calculation History</h1>
            <p>All your calculations will appear here automatically.</p>
          </div>
          {items.length > 0 && (
            <button className="clear-history-btn" onClick={handleClearHistory}>
              🗑️ Clear All History
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="empty-history">
            <p>📭 No calculations yet</p>
            <p className="empty-description">Start performing calculations on the dashboard and they will appear here automatically.</p>
          </div>
        ) : (
          <HistoryTable items={items} />
        )}
      </div>
    </div>
  );
}

export default History;