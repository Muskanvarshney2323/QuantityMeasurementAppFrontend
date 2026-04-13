function SignupForm({ formData, handleChange, handleSubmit, error, loading }) {
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Your Name"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter Your Email"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Your Password"
        value={formData.password}
        onChange={(e) => handleChange("password", e.target.value)}
      />

      {error && <p className="error-text">{error}</p>}

      <button type="submit" className="primary-btn full-width">
        {loading ? "Signing up..." : "Signup"}
      </button>
    </form>
  );
}

export default SignupForm;