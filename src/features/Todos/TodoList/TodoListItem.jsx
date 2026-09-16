import { useState } from "react";
import TextInputWithLabel from "../../../shared/TextInputWithLabel.jsx";
import {
  isValidTodoTitle,
  TODO_TITLE_MAX_LENGTH,
} from "../../../utils/todoValidation.js";
import styles from "./TodoList.module.css";
import formStyles from "../../../shared/FormControls.module.css";

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo, onDeleteTodo }) {
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
    <li className={styles.item}>
      {isEditing ? (
        <form className={styles.editForm} onSubmit={handleUpdate}>
          <TextInputWithLabel
            elementId={`todoTitle-${todo.id}`}
            labelText="Todo"
            value={workingTitle}
            onChange={handleEdit}
            maxLength={TODO_TITLE_MAX_LENGTH}
          />

          <div className={styles.editActions}>
            <button
              className={`${formStyles.button} ${formStyles.secondaryButton}`}
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              className={formStyles.button}
              type="submit"
              disabled={!isValidTodoTitle(workingTitle)}
            >
              Update
            </button>
          </div>
        </form>
      ) : (
        <>
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => onCompleteTodo(todo.id)}
            aria-label={
              todo.isCompleted
                ? `Mark "${todo.title}" as active`
                : `Mark "${todo.title}" as completed`
            }
          />

          <button
            className={`${styles.todoButton} ${
              todo.isCompleted ? styles.completed : ""
            }`}
            type="button"
            onClick={() => setIsEditing(true)}
          >
            {todo.title}
          </button>

          <button
            className={`${formStyles.button} ${formStyles.secondaryButton}`}
            type="button"
            onClick={() => onDeleteTodo(todo.id)}
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
}

export default TodoListItem;
