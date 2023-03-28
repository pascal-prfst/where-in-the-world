import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeContextProvider(props) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(JSON.parse(localStorage.getItem("dark-mode")));
  }, [darkMode]);

  function toggleDarkMode() {
    localStorage.setItem("dark-mode", JSON.stringify(!darkMode));
    setDarkMode(prevDarkMode => {
      !prevDarkMode;
    });
  }
  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
