import React from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import App from './App.jsx';
import { Provider } from 'react-redux';
import {store,persistor} from './store/store'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
const root = ReactDOM.createRoot(document.getElementById('root'));
console.time("rehydrate");
persistor.subscribe(() => {
  const { bootstrapped } = persistor.getState();
  if (bootstrapped) {
    console.timeEnd("rehydrate");
  }
});
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate  persistor={persistor}
      loading={null}
        onBeforeLift={() => {
          console.timeEnd("rehydrate");
        }}
      >
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

