import { createContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeContextProvider(props) {
  const [darkMode, setDarkMode] = useState(false);

  function toggleDarkMode() {
    setDarkMode(prevDarkMode => !prevDarkMode);
  }
  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
