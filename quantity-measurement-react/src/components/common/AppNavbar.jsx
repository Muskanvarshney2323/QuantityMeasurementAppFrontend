import { useNavigate, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { getCurrentUser, logoutUser } from "../../services/authService";
import { useState } from "react";

function AppNavbar({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    logoutUser();
    setShowProfileMenu(false);
    navigate("/");
  };

  const isLandingPage = location.pathname === "/";
  const isAuthPage = location.pathname === "/auth";
  const showHistoryBtn = !isLandingPage && !isAuthPage && user;

  return (
    <header className="navbar">
      <h2 className="logo-text" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        QMeasure ⚖️
      </h2>

      <div className="nav-actions">
        {showHistoryBtn && (
          <button className="nav-btn nav-history" onClick={() => navigate("/history")}>
            📋 History
          </button>
        )}

        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

        {!user ? (
          <button className="nav-btn nav-login" onClick={() => navigate("/auth")}>
            Login/SignUp
          </button>
        ) : (
          <div className="profile-container">
            <button
              className="profile-btn"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              title={`${user.name || "User"} - ${user.email}`}
            >
              👤
            </button>

            {showProfileMenu && (
              <div className="profile-menu">
                <div className="profile-menu-header">
                  <p className="profile-name">{user.name || "User"}</p>
                  <p className="profile-email">{user.email}</p>
                </div>
                <button className="profile-menu-item" onClick={() => navigate("/history")}>
                  📋 View History
                </button>
                <button className="profile-menu-item logout" onClick={handleLogout}>
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default AppNavbar;