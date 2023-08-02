export enum ActionType {
  ADD_TODO = 'ADD_TODO',
  EDIT_TODO = 'EDIT_TODO',
  DELETE_TODO = 'DELETE_TODO'
}

interface Todo {
  id: number;
  text: string;
}

export const addTodo = (todo: Todo) => ({
  type: ActionType.ADD_TODO,
  payload: todo,
});

export const editTodo = (id: number, text: string) => ({
  type: ActionType.EDIT_TODO,
  payload: { id, text },
});

export const deleteTodo = (id: number) => ({
  type: ActionType.DELETE_TODO,
  payload: id,
});