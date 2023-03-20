import { useContext } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

import classes from "./Header.module.css";
import ThemeContext from "@/context/theme-context";

function Header() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <header
      className={
        darkMode ? `${classes.header} ${classes.header_dark}` : `${classes.header}`
      }>
      <h1>Where in the world?</h1>
      <div className={classes.theme_container} onClick={toggleDarkMode}>
        {darkMode ? (
          <>
            <MdOutlineLightMode className={classes.theme_icon} />
            <p>Light Mode</p>
          </>
        ) : (
          <>
            <MdOutlineDarkMode className={classes.theme_icon} />
            <p>Dark Mode</p>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
