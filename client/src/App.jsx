// client/src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'
import ProtectedRoute from './components/auth/ProtectedRoute'
import MainLayout from './components/layout/MainLayout'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage';
import AnalyticsPage from './pages/AnalyticsPage'
// IMPORTANT: Notice MainLayout is NOT here at the top level

function App() {
  return (
    <Router> {/* 1. Router starts here */}
      <Routes>
       <Route path="/" element={<HomePage />} />
  <Route path="/auth" element={<AuthPage />} />
  <Route path="/dashboard" element={<DashboardPage />} />
  <Route path="/profile" element={<ProfilePage />} />
    <Route path="/analytics" element={<AnalyticsPage />} />
a
      </Routes>
    </Router> 
  );
}

export default App;