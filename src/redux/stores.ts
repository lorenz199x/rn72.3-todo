import { applyMiddleware, compose, legacy_createStore as createStore, StoreEnhancer } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
// import Reactotron from '../../reactotron.config';
import { rootReducer } from './reducers';
// import { rootSaga } from './sagas';
import ReduxThunk from 'redux-thunk';

/**
 * this file I used this kind of approach on my current project since this it is a large app
 * I commented some lines just to give you an idea on how I implement this kind of approach if there's an API connection.
 * I used saga for handling response connecting to Api endpoint in service folder.
 * 
 * I commented also the lines under storeEnhancer since I use Reactotron for log monitoring
 */


export function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];

  let storeEnhancer: StoreEnhancer[] = [applyMiddleware(...middleware)];
  // if (Reactotron.createEnhancer) {
  //   storeEnhancer = storeEnhancer.concat(Reactotron.createEnhancer());
  // }
  // const store = createStore(rootReducer, compose(...storeEnhancer));
  // const persistor = persistStore(store);
  // sagaMiddleware.run(rootSaga);

  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  const persistor = persistStore(store);
  // sagaMiddleware.run(rootSaga);

  return {
    store,
    persistor,
  };
}
