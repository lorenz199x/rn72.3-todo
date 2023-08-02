import AsyncStorage from '@react-native-async-storage/async-storage';
import { Action } from 'secureToDoList';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import { todoReducer } from './todoReducers'
/**
 * this is the index file for all reducers file if the app add more features
 * so the dev can add all reducers here inside combinereducers
 * I added sample that alredy commented on line 23
 * 
 * for the appconfig I used this since to save all todo task in local storage, so that the user can view all task every reopning of the app
*/

const appConfig = {
  key: 'app',
  storage: AsyncStorage,
  timeout: 0,
  whitelist: [
    'todos',
  ]
};

const Reducers = combineReducers({
  // Breweries: breweryReducer,
  Todos: persistReducer(appConfig, todoReducer),

});

export type RootState = ReturnType<typeof Reducers>;

export const rootReducer = (state: any, action: Action) => {
  return Reducers(state, action);
};
