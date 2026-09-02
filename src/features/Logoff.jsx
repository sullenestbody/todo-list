import { useAuth } from '../contexts/AuthContext.jsx';

function Logoff() {
  const { logout } = useAuth();

  const handleLogOut = async () => {
  await logout();
};

return (
  <button type="button" onClick={handleLogOut}>
    Log Out
  </button>
);
}

export default Logoff;