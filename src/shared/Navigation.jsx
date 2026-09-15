import { NavLink } from "react-router";
import { useAuth } from "../contexts/AuthContext.jsx";
import styles from "./Navigation.module.css";

function Navigation() {
  const { isAuthenticated } = useAuth();

  const getLinkClassName = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.activeLink}` : styles.link;

  return (
    <nav>
      <ul className={styles.navList}>
        <li>
          <NavLink to="/about" className={getLinkClassName}>
            About
          </NavLink>
        </li>

        {isAuthenticated ? (
          <>
            <li>
              <NavLink to="/todos" className={getLinkClassName}>
                Todos
              </NavLink>
            </li>

            <li>
              <NavLink to="/profile" className={getLinkClassName}>
                Profile
              </NavLink>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login" className={getLinkClassName}>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
