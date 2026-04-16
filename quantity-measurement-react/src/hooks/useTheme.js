import { useEffect, useState } from "react";
import { STORAGE_KEYS } from "../utils/constants";

function useTheme() {
  const [theme, setTheme] = useState(localStorage.getItem(STORAGE_KEYS.THEME) || "dark");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme };
}

export default useTheme;