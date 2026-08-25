import { useState } from 'react';
import TextInputWithLabel from '../../../shared/TextInputWithLabel.jsx';
import { isValidTodoTitle } from '../../../utils/todoValidation.js';

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  function handleCancel() {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  }

  function handleEdit(event) {
    setWorkingTitle(event.target.value);
  }

  function handleUpdate(event) {
    event.preventDefault();

    if (!isValidTodoTitle(workingTitle)) {
      return;
    }

    onUpdateTodo({
      ...todo,
      title: workingTitle.trim(),
    });

    setIsEditing(false);
  }

  return (
    <li>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <TextInputWithLabel
            elementId={`todoTitle-${todo.id}`}
            labelText="Todo"
            value={workingTitle}
            onChange={handleEdit}
          />

          <button type="button" onClick={handleCancel}>
            Cancel
          </button>

          <button
            type="submit"
            disabled={!isValidTodoTitle(workingTitle)}
          >
            Update
          </button>
        </form>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => onCompleteTodo(todo.id)}
          />

          <button
            type="button"
            onClick={() => setIsEditing(true)}
          >
            {todo.title}
          </button>
        </>
      )}
    </li>
  );
}

export default TodoListItem;