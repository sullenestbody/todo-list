function TodoList() {
  const todoList = [
    { id: 1, title: 'analyze assignments' },
    { id: 2, title: 'put repo through CTD AI' },
    { id: 3, title: 'final check' },
  ]

  return (
    <ul>
      {todoList.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}

export default TodoList