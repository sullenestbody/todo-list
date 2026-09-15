import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext.jsx";
import styles from "../shared/Header.module.css";

function Logoff() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogOut() {
    const result = await logout();

    if (result.success) {
      navigate("/login", { replace: true });
    } else {
      window.alert(result.error);
    }
  }

  return (
    <button
      className={styles.logOutButton}
      type="button"
      onClick={handleLogOut}
    >
      Log Out
    </button>
  );
}

export default Logoff;
