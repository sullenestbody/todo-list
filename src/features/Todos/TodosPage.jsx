import { useEffect, useState } from 'react';
import TodoForm from './TodoForm.jsx';
import TodoList from './TodoList/TodoList.jsx';

function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([]);
const [error, setError] = useState('');
const [isTodoListLoading, setIsTodoListLoading] = useState(false);
useEffect(() => {
  async function fetchTodos() {
    setError('');
    setIsTodoListLoading(true);

    try {
      const params = new URLSearchParams({
        limit: 100,
      });

      const response = await fetch(`/api/tasks?${params}`, {
        headers: {
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
      });

      if (response.status === 401) {
        throw new Error('unauthorized');
      }

      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }

      const data = await response.json();
      setTodoList(data.tasks);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsTodoListLoading(false);
    }
  }

  if (token) {
    fetchTodos();
  }
}, [token]); 
const updateTodo = async (editedTodo) => {
  setError('');
  const originalTodo = todoList.find(
    (todo) => todo.id === editedTodo.id
  );

  if (!originalTodo) {
    return;
  }

  // Optimistic update
  setTodoList((previousTodoList) =>
    previousTodoList.map((todo) =>
      todo.id === editedTodo.id ? { ...editedTodo } : todo
    )
  );

  try {
    const response = await fetch(
      `/api/tasks/${editedTodo.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({
          title: editedTodo.title,
          isCompleted: editedTodo.isCompleted,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update todo');
    }
  } catch (error) {
    // Roll back if the API update fails
    setTodoList((previousTodoList) =>
      previousTodoList.map((todo) =>
        todo.id === editedTodo.id ? originalTodo : todo
      )
    );

    setError(error.message);
  }
};
async function addTodo(todoTitle) {
  setError('');

  const newTodo = {
    id: Date.now(),
    title: todoTitle,
    isCompleted: false,
  };

  // Optimistic update: show it immediately
  setTodoList((previousTodoList) => [
    newTodo,
    ...previousTodoList,
  ]);

  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': token,
      },
      credentials: 'include',
      body: JSON.stringify({
        title: newTodo.title,
        isCompleted: newTodo.isCompleted,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add todo');
    }

    const savedTodo = await response.json();

    setTodoList((previousTodoList) =>
      previousTodoList.map((todo) =>
        todo.id === newTodo.id ? savedTodo : todo
      )
    );
  } catch (error) {
    setTodoList((previousTodoList) =>
      previousTodoList.filter((todo) => todo.id !== newTodo.id)
    );

    setError(error.message);
  }
}

const completeTodo = async (id) => {
  setError('');

  const originalTodo = todoList.find((todo) => todo.id === id);

  if (!originalTodo) {
    return;
  }

  // Optimistic update
  setTodoList((previousTodoList) =>
    previousTodoList.map((todo) =>
      todo.id === id
        ? { ...todo, isCompleted: true }
        : todo
    )
  );

  try {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': token,
      },
      credentials: 'include',
      body: JSON.stringify({
        isCompleted: true,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to complete todo');
    }
  } catch (error) {
    // Roll back to the original todo
    setTodoList((previousTodoList) =>
      previousTodoList.map((todo) =>
        todo.id === id ? originalTodo : todo
      )
    );

    setError(error.message);
  }
};

  return (
  <>
    {error && (
      <div>
        <p>{error}</p>
        <button onClick={() => setError('')}>
          Clear Error
        </button>
      </div>
    )}

    {isTodoListLoading && <p>Loading todos...</p>}

    <TodoForm onAddTodo={addTodo} />

    <TodoList
      todoList={todoList}
      onCompleteTodo={completeTodo}
      onUpdateTodo={updateTodo}
    />
  </>
);
}

export default TodosPage;