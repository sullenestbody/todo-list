import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext.jsx";

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
    } catch (error) {
      setAuthError(`Error: ${error.name} | ${error.message}`);
    } finally {
      setIsLoggingOn(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {authError && <p>{authError}</p>}

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />

      <button type="submit" disabled={isLoggingOn}>
        {isLoggingOn ? "Logging in..." : "Log On"}
      </button>
    </form>
  );
}

export default LoginPage;
