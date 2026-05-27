import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import axios from 'axios';

// This applies the header to ALL axios requests across the entire app
axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'true';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>
);