// Entry.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Entry from './Entry';
// import AsyncStorage from '../__mocks__/AsyncStorage';

// jest.mock('@react-native-async-storage/async-storage', () => require('../__mocks__/AsyncStorage'));

// Create a mock store with the desired initial state
const initialState = {
  Todos: {
    todos: [{ id: 1, text: 'Todo item 1' }, { id: 2, text: 'Todo item 2' }],
  },
};


const mockStore = configureMockStore(); // Create a mock store
// let store = mockStore(initialState);


describe('Entry Component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      todos: [],
    });
  });

  test('renders correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Entry />
      </Provider>
    );

    expect(getByText('Secured TODO List')).toBeDefined();
  });

  test('adds a todo', () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <Entry />
      </Provider>
    );

    const input = getByPlaceholderText('Enter your task...');
    const addButton = getByText('Add');

    fireEvent.changeText(input, 'Test Todo');
    fireEvent.press(addButton);

    const expectedAction = {
      type: 'ADD_TODO',
      payload: {
        id: expect.any(Number),
        text: 'Test Todo',
      },
    };

    expect(store.getActions()).toEqual([expectedAction]);
  });

  test('deletes a todo', () => {
    const todoId = 123;
    store = mockStore({
      todos: [{ id: todoId, text: 'Test Todo' }],
    });

    const { getByText } = render(
      <Provider store={store}>
        <Entry />
      </Provider>
    );

    const deleteButton = getByText('Delete');

    fireEvent.press(deleteButton);

    const expectedAction = {
      type: 'DELETE_TODO',
      payload: todoId,
    };

    expect(store.getActions()).toEqual([expectedAction]);
  });

  test('edits a todo', () => {
    const todoId = 123;
    store = mockStore({
      todos: [{ id: todoId, text: 'Test Todo' }],
    });

    const { getByText } = render(
      <Provider store={store}>
        <Entry />
      </Provider>
    );

    const editButton = getByText('Edit');

    fireEvent.press(editButton);

    const expectedAction = {
      type: 'EDIT_TODO',
      payload: { id: todoId, newText: 'Updated Todo' },
    };

    expect(store.getActions()).toEqual([expectedAction]);
  });
});
