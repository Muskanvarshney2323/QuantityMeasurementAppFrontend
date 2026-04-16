import { useNavigate } from "react-router-dom";

function LandingHero() {
  const navigate = useNavigate();

  return (
    <section className="landing-hero">
      <div className="landing-card">
        <h1>Quantity Measurement App</h1>
        <p>
          Convert, compare, add, subtract, and divide measurements with a clean
          and interactive React frontend.
        </p>

        <div className="landing-actions">
          <button className="primary-btn" onClick={() => navigate("/auth")}>
            Login / Signup
          </button>

          <button className="secondary-btn" onClick={() => navigate("/dashboard")}>
            Perform Operations Without Login
          </button>
        </div>
      </div>
    </section>
  );
}

export default LandingHero;