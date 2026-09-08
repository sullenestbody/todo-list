import { useMemo } from "react";
import TodoListItem from "./TodoListItem.jsx";

const emptyMessages = {
  all: "Add todo above to get started.",
  active: "No active todos. Add a todo above to get started.",
  completed: "No completed todos yet. Complete some tasks to see them here.",
};

function TodoList({
  todoList,
  onCompleteTodo,
  onUpdateTodo,
  dataVersion,
  statusFilter = "active",
}) {
  const filteredTodoList = useMemo(() => {
    let todos = todoList;

    if (statusFilter === "active") {
      todos = todoList.filter((todo) => !todo.isCompleted);
    } else if (statusFilter === "completed") {
      todos = todoList.filter((todo) => todo.isCompleted);
    }

    return {
      version: dataVersion,
      todos,
    };
  }, [todoList, dataVersion, statusFilter]);

  return filteredTodoList.todos.length === 0 ? (
    <p>{emptyMessages[statusFilter] || emptyMessages.all}</p>
  ) : (
    <ul data-version={filteredTodoList.version}>
      {filteredTodoList.todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onCompleteTodo={onCompleteTodo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;