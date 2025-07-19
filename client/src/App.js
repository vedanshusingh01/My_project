
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <header className="App-header">
          <h1>Health Tracker</h1>
          <p>Welcome to your personal health tracking app!</p>
        </header>
      </div>
    </AuthProvider>
  );
}

export default App;
