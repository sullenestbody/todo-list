import './App.css'

function App() {
  const todoList = [
    { id: 1, title: 'analyze assignments' },
    { id: 2, title: 'put repo through CTD AI' },
    { id: 3, title: 'final check' },
  ]

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default App