import React from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import Navbar from './Navbar' // Import our new component

function MainLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const userData = JSON.parse(localStorage.getItem('user')) || { name: 'User' };

  // Logic: Map the URL path to a friendly Page Title
  const getPageTitle = () => {
    if (location.pathname === '/dashboard') return 'Dashboard';
    if (location.pathname === '/analytics') return 'Financial Analytics';
    return 'Sub-Pilot';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Sidebar - Same logic as before */}
      <aside className="w-64 bg-white border-r flex flex-col hidden lg:flex">
        <div className="p-6 border-b">
           <h1 className="text-2xl font-black text-blue-600 italic">Sub-Pilot</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <NavLink to="/dashboard" className={({ isActive }) => `flex items-center p-3 rounded-xl transition ${isActive ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-500 hover:bg-gray-50'}`}>
            Dashboard
          </NavLink>
          <NavLink to="/analytics" className={({ isActive }) => `flex items-center p-3 rounded-xl transition ${isActive ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-500 hover:bg-gray-50'}`}>
            Analytics
          </NavLink>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t">
          <div className="flex items-center space-x-3 p-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
              {userData.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-bold truncate">{userData.name}</span>
          </div>
          <button onClick={handleLogout} className="w-full mt-2 text-sm text-red-500 p-2 hover:bg-red-50 rounded-lg transition">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Logic: Integrated the New Navbar here */}
        <Navbar pageTitle={getPageTitle()} />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default MainLayout