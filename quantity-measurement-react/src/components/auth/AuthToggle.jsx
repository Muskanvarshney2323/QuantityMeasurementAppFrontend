function AuthToggle({ isSignup, setIsSignup }) {
  return (
    <div className="auth-toggle">
      <button
        className={!isSignup ? "toggle-btn active" : "toggle-btn"}
        onClick={() => setIsSignup(false)}
      >
        Login
      </button>
      <button
        className={isSignup ? "toggle-btn active" : "toggle-btn"}
        onClick={() => setIsSignup(true)}
      >
        Signup
      </button>
    </div>
  );
}

export default AuthToggle;