import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import Store from './app/Store.js';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <Router>
        <Toaster position='top-center' reverseOrder={false} />
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
