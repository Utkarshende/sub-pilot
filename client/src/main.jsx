import React from 'react';
import { createRoot } from 'react-dom/client'; // Notice the change here
import { BrowserRouter } from 'react-router-dom'; // Our "GPS" for pages
import App from './App';
import './index.css';

// We get the 'root' div from your index.html
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);