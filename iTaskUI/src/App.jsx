import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';  // Import BrowserRouter
import AppRoutes from './AppRoutes';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
      <Navbar />
      <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
