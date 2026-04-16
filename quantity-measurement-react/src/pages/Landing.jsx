import { useNavigate } from "react-router-dom";
import AppNavbar from "../components/common/AppNavbar";
import useTheme from "../hooks/useTheme";

function Landing() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="page-container">
      <AppNavbar theme={theme} toggleTheme={toggleTheme} />

      <div className="landing-hero-section">
        <div className="landing-hero-content">
          <div className="landing-hero-left">
            <h1 className="landing-title">Quantity Measurement</h1>
            <p className="landing-subtitle">
              Convert, compare, add, subtract, and divide different quantities with ease.
            </p>
            <p className="landing-description">
              A powerful tool to perform complex quantity measurements instantly. Perfect for engineers, students, and professionals.
            </p>

            <div className="landing-stats">
              <div className="stat-item">
                <h3>4+</h3>
                <p>Measurement Types</p>
              </div>
              <div className="stat-item">
                <h3>5+</h3>
                <p>Operations</p>
              </div>
              <div className="stat-item">
                <h3>Instant</h3>
                <p>Results</p>
              </div>
            </div>

            <div className="landing-actions">
              <button className="btn-primary-large" onClick={() => navigate("/dashboard")}>
                Start Measuring
              </button>
              <button className="btn-secondary-large" onClick={() => navigate("/auth")}>
                Login / Sign Up
              </button>
            </div>

            <p className="landing-note">
              💡 <strong>Tip:</strong> You can perform operations without login. Login to save your history and access it anytime.
            </p>
          </div>

          <div className="landing-hero-right">
            <div className="landing-illustration">
              <div className="illus-box illus-box-1">
                <span className="illus-icon">📏</span>
                <p>Length</p>
              </div>
              <div className="illus-box illus-box-2">
                <span className="illus-icon">⚖️</span>
                <p>Weight</p>
              </div>
              <div className="illus-box illus-box-3">
                <span className="illus-icon">🌡️</span>
                <p>Temperature</p>
              </div>
              <div className="illus-box illus-box-4">
                <span className="illus-icon">💧</span>
                <p>Volume</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="landing-features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Get instant results with zero latency calculations</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>Your data is encrypted and secure. No tracking.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Responsive Design</h3>
            <p>Works seamlessly on desktop, tablet, and mobile</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💾</div>
            <h3>Save History</h3>
            <p>Login to save and access your calculation history</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;