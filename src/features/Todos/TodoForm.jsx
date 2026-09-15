import { useRef, useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel.jsx";
import {
  isValidTodoTitle,
  TODO_TITLE_MAX_LENGTH,
} from "../../utils/todoValidation.js";
import styles from "../../shared/FormControls.module.css";

function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");
  const inputRef = useRef(null);

  function handleAddTodo(event) {
    event.preventDefault();

    const trimmedTitle = workingTodoTitle.trim();

    if (!isValidTodoTitle(trimmedTitle)) {
      return;
    }

    onAddTodo(trimmedTitle);
    setWorkingTodoTitle("");
    inputRef.current?.focus();
  }

  return (
    <form className={styles.formRow} onSubmit={handleAddTodo}>
      <div className={styles.formField}>
        <TextInputWithLabel
          elementId="todoTitle"
          labelText="Todo"
          ref={inputRef}
          value={workingTodoTitle}
          onChange={(event) => setWorkingTodoTitle(event.target.value)}
          maxLength={TODO_TITLE_MAX_LENGTH}
        />
      </div>

      <button
        type="submit"
        disabled={!isValidTodoTitle(workingTodoTitle)}
        className={styles.button}
      >
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;
