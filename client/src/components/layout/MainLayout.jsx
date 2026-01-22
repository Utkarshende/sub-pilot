import React from 'react'
import { useNavigate } from 'react-router-dom'

function MainLayout({ children }) {
  const navigate = useNavigate();
  
  // Logic: Retrieve the user object we saved during Auth
  const userData = JSON.parse(localStorage.getItem('user')) || { name: 'User' };

  const handleLogout = () => {
    // Logic: Clear all traces of the session
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Logic: Redirect to login
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-blue-600 tracking-tight italic">Sub-Pilot</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-2 mb-4">
            Menu
          </div>
          <button className="w-full text-left p-3 rounded-xl bg-blue-50 text-blue-700 font-medium">
            Dashboard
          </button>
        </nav>

        {/* User Profile Section at Bottom */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              {userData.name.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-gray-800 truncate">{userData.name}</p>
              <p className="text-xs text-gray-500">Free Tier</p>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors font-medium border border-transparent hover:border-red-100"
          >
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-10">
          <span className="text-gray-500 font-medium">Overview</span>
          <div className="text-sm text-gray-400">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
        </header>
        
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}

export default MainLayout