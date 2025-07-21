import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './firebase/config';
import { Provider } from 'react-redux';
import store from './store';
import 'bulma/css/bulma.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
