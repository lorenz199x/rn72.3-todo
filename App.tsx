import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import Entry from './src/Entry';
import { PersistGate } from 'redux-persist/integration/react';
import { configureStore } from './src/redux/stores';
const { store, persistor } = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Entry />
      </PersistGate>
    </Provider>
  )
}

export default App

/**
 * NOTE:
 * some folders are empty but I just added it to give you an idea on how I structure my project
 * Also I didnt add other screen since this is just a simple app so I put all the codes on my Entry file
 */