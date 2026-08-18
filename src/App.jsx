
import { useState } from 'react'
import TodoForm from './TodoForm.jsx'
import TodoList from './TodoList.jsx'
import './App.css'
 const todos = [
    { id: 1, title: 'analyze assignments' },
    { id: 2, title: 'put repo through CTD AI' },
    { id: 3, title: 'final check' },
  ]
function App() {
  const [todoList, setTodoList] = useState(todos)
  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm />
      <TodoList todoList={todoList} />
    </div>
  )
}

export default App