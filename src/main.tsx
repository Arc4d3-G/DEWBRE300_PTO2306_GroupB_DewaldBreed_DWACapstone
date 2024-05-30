import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createApi } from './api/createApi.ts';
import { createStore } from './model/useStore.ts';

export const api = createApi();
export const store = createStore(api);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
