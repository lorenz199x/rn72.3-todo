import { Reducer } from 'redux'
import { Action } from 'secureToDoList'
import { ActionType } from '../actions/todoAction';
import { log } from '@utils/LoggerUtil';

interface Todo {
  id: number;
  text: string;
}

interface AppState {
  todos: Todo[];
}

const initialState: AppState = {
  todos: [],
};

export const todoReducer: Reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case ActionType.EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
        ),
      };
    case ActionType.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
};

// export default todoReducer