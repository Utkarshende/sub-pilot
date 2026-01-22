// client/src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Analytics from './pages/AnalyticsPage';
import MainLayout from './components/layout/MainLayout'
// IMPORTANT: Notice MainLayout is NOT here at the top level

function App() {
  return (
    <Router> {/* 1. Router starts here */}
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              {/* 2. MainLayout lives INSIDE the DashboardPage or the Route */}
              <DashboardPage /> 
            </ProtectedRoute>
          } 
        />
<Route path="/analytics" element={<MainLayout><Analytics /></MainLayout>} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router> 
  );
}

export default App;