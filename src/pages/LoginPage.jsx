import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext.jsx";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from;
  const destination = from
    ? `${from.pathname}${from.search || ""}${from.hash || ""}`
    : "/todos";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(destination, { replace: true });
    }
  }, [isAuthenticated, navigate, destination]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoggingOn(true);
    setAuthError("");

    try {
      const result = await login(email, password);

      if (!result.success) {
  setAuthError(result.error);
}
    } catch {
      setAuthError("Unable to log in right now. Please try again.");
    } finally {
      setIsLoggingOn(false);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h2 className={styles.title}>Log In</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          {authError && <p className={styles.error}>{authError}</p>}

          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              className={styles.input}
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              className={styles.input}
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button
            className={styles.button}
            type="submit"
            disabled={isLoggingOn}
          >
            {isLoggingOn ? "Logging in..." : "Log On"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
