function Header({ token, onSetToken, onSetEmail }) {
  const handleLogOut = () => {
    onSetToken('');
    onSetEmail('');
  };

  return (
    <header>
      <h1>Todo List</h1>

      {token && (
        <button type="button" onClick={handleLogOut}>
          Log Out
        </button>
      )}
    </header>
  );
}

export default Header;