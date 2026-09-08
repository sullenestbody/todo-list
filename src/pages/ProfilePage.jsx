import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

function ProfilePage() {
  const { email, token } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function fetchStats() {
      if (!token) return;

      setLoading(true);
      setError("");

      try {
        const todos = [];
        let page = 1;
        let hasNext = true;

        while (hasNext) {
          const response = await fetch(
            `/api/tasks?limit=100&page=${page}`,
            {
              headers: { "X-CSRF-TOKEN": token },
              credentials: "include",
            },
          );

          const data = await response.json();

          if (
            response.status === 404 &&
            data.message === "No tasks found for user"
          ) {
            break;
          }

          if (!response.ok) {
            throw new Error(data.message || "Failed to fetch todos");
          }

          todos.push(...data.tasks);
          hasNext = Boolean(data.pagination?.hasNext);
          page += 1;
        }

        const total = todos.length;
        const completed = todos.filter((todo) => todo.isCompleted).length;

        if (!ignore) {
          setStats({ total, completed, active: total - completed });
        }
      } catch (err) {
        if (!ignore) {
          setError(`Error loading statistics: ${err.message}`);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchStats();

    return () => {
      ignore = true;
    };
  }, [token]);

  return (
    <main>
      <h2>Your Profile</h2>
      <p>Name: {email}</p>
      <p>Status: Signed in</p>

      <h3>Todo Statistics</h3>
      {loading ? (
        <p>Loading statistics...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <p>Total: {stats.total}</p>
          <p>Completed: {stats.completed}</p>
          <p>Active: {stats.active}</p>
          {stats.total > 0 && (
            <p>
              Completion: {Math.round((stats.completed / stats.total) * 100)}%
            </p>
          )}
        </>
      )}
    </main>
  );
}

export default ProfilePage;