import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutsContextProvider } from './context/WorkoutsContext';
import { AuthContextProvider } from './context/AuthContext';
import { UsersContextProvider } from './context/UsersContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 // <React.StrictMode>

    <AuthContextProvider>
      <WorkoutsContextProvider>
        <UsersContextProvider>
          <App />
        </UsersContextProvider>
      </WorkoutsContextProvider>
    </AuthContextProvider>
 // </React.StrictMode>
)