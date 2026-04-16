function LoginForm({ formData, handleChange, handleSubmit, error, loading }) {
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter email"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter password"
        value={formData.password}
        onChange={(e) => handleChange("password", e.target.value)}
      />

      {error && <p className="error-text">{error}</p>}

      <button type="submit" className="primary-btn full-width">
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;