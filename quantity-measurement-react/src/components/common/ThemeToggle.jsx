function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button className="nav-btn" onClick={toggleTheme}>
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  );
}

export default ThemeToggle;