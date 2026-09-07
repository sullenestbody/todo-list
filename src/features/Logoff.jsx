import { useAuth } from '../contexts/AuthContext.jsx';

function Logoff() {
  const { logout } = useAuth();
  const handleLogOut = async () => {
  const result = await logout();

  if (!result.success) {
    window.alert(result.error);
  }
};

return (
  <button type="button" onClick={handleLogOut}>
    Log Out
  </button>
);
}

export default Logoff;