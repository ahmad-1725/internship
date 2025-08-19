import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { JobProvider } from './context/JobContext';
import './index.css'
import { initDarkMode } from './utils/theme';
import './index.css'

initDarkMode();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <JobProvider>
      <App />
    </JobProvider>
);
