import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../components/common/AppNavbar";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";
import { validateAuthForm } from "../utils/validators";

function Auth() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { handleLogin, handleSignup, loading } = useAuth();

  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationMessage = validateAuthForm(formData, isSignup);
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    setError("");

    const response = isSignup
      ? await handleSignup(formData)
      : await handleLogin({
          email: formData.email,
          password: formData.password
        });

    if (response.success) {
      navigate("/dashboard");
      return;
    }

    setError(response.message);
  };

  return (
    <div className="page-container">
      <AppNavbar theme={theme} toggleTheme={toggleTheme} />

      <div className="auth-page-wrapper">
        <div className="auth-container">
          <div className="auth-form-section">
            <div className="auth-header">
              <h1>{isSignup ? "Create Account" : "Log In to Your Account"}</h1>
              <p>{isSignup ? "Join us and unlock all features" : "Welcome back! Login to access your history"}</p>
            </div>

            {isSignup ? (
              <SignupForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                error={error}
                loading={loading}
              />
            ) : (
              <LoginForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                error={error}
                loading={loading}
              />
            )}

            <div className="auth-toggle-section">
              <p className="toggle-text">
                {isSignup
                  ? "Already have an account? "
                  : "Don't have an account? "}
                <button
                  type="button"
                  className="toggle-link"
                  onClick={() => {
                    setIsSignup(!isSignup);
                    setError("");
                    setFormData({ name: "", email: "", password: "" });
                  }}
                >
                  {isSignup ? "Login" : "Sign up"}
                </button>
              </p>
            </div>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <button
              type="button"
              className="btn-guest"
              onClick={() => navigate("/dashboard")}
            >
              📊 Continue Without Login
            </button>

            <p className="auth-footer-note">
              By logging in, you agree to save your calculation history. You can still perform calculations without login.
            </p>
          </div>

          <div className="auth-visual-section">
            <div className="auth-visual-content">
              <h2>Quantity Measurement</h2>
              <p className="visual-subtitle">Fast. Accurate. Secure.</p>
              
              <div className="visual-features">
                <div className="visual-feature">
                  <span className="visual-icon">✓</span>
                  <p>Instant conversions</p>
                </div>
                <div className="visual-feature">
                  <span className="visual-icon">✓</span>
                  <p>Multiple operations</p>
                </div>
                <div className="visual-feature">
                  <span className="visual-icon">✓</span>
                  <p>Save history</p>
                </div>
                <div className="visual-feature">
                  <span className="visual-icon">✓</span>
                  <p>No registration needed</p>
                </div>
              </div>

              <div className="visual-badges">
                <div className="badge">4+ Types</div>
                <div className="badge">5+ Operations</div>
                <div className="badge">100% Free</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Auth;