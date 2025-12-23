import React from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import App from './App.jsx';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #f8fafc;
    color: #1e293b;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
`;

// Start the timer
console.time("rehydrate");
// Flag to prevent double-calling timeEnd in Strict Mode
let isTimerEnded = false;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate 
        loading={null} 
        persistor={persistor}
        onBeforeLift={() => {
          if (!isTimerEnded) {
            console.timeEnd("rehydrate");
            isTimerEnded = true;
          }
        }}
      >
        <GlobalStyle />
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);