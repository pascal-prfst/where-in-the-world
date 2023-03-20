import { Fragment, useContext } from "react";

import ThemeContext from "@/context/theme-context";
import Header from "./header";

function Layout(props) {
  const { darkMode } = useContext(ThemeContext);

  return (
    <Fragment>
      <Header />
      <main
        className={darkMode ? "main-container main-container-dark" : "main-container"}>
        {props.children}
      </main>
    </Fragment>
  );
}

export default Layout;
