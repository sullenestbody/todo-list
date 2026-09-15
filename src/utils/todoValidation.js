export const TODO_TITLE_MAX_LENGTH = 100;

export function isValidTodoTitle(title) {
  const trimmedTitle = title.trim();

  return (
    trimmedTitle.length > 0 && trimmedTitle.length <= TODO_TITLE_MAX_LENGTH
  );
}
