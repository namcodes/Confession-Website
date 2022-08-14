import styles from "../styles/global.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";

function Header() {
  const [theme, setTheme] = useState(false);

  const addClass = () => {
    setTheme((curr) => (curr === false ? true : false));

    if (localStorage.theme === "light") {
      window.localStorage.setItem("theme", "dark");
      document.documentElement.setAttribute("class", "dark");
    } else {
      window.localStorage.setItem("theme", "light");
      document.documentElement.removeAttribute("class", "dark");
    }
  };
  // eslint-disable-next-line
  useEffect(() => {
    if (localStorage.getItem("theme") === null) {
      localStorage.setItem("theme", "light");
    } else {
      if (localStorage.theme === "dark") {
        setTheme(true);
        document.documentElement.setAttribute("class", "dark");
      }else{
        setTheme(false);
        document.documentElement.removeAttribute("class", "dark");
      }
    }
  }, []);
  return (
    <div className={styles.contentHeader}>
      <div className={`${styles.flexBetween} ${styles.maxWxl}`}>
        <Link href="/">
          <a className={styles.title}>Confession v1.0</a>
        </Link>

        <div className={styles.contentHeaderRight}>
          <button className={styles.theme} onClick={addClass}>
            {theme ? (
              <i className="fa fa-moon"></i>
            ) : (
              <i className="fa fa-sun"></i>
            )}
          </button>
          <Link href="/create">
            <a className={`${styles.desktop} ${styles.btnCreate}`}>
              <i className="fa fa-plus"></i> Create your own story
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
