import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function MainLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Clear credentials
    localStorage.removeItem('token'); 
    // Note: We usually keep BUDGET_KEY so user settings remain on the device
    
    // 2. Redirect to Auth
    navigate('/'); 
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/analytics', label: 'Analytics', icon: '📈' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white border-r flex flex-col transition-all duration-300 ease-in-out z-20`}>
        {/* Logo Section */}
        <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} border-b h-20`}>
          {!isCollapsed && <h1 className="text-xl font-black text-indigo-600 tracking-tighter uppercase">SubPilot</h1>}
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400">
            {isCollapsed ? '→' : '←'}
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <div key={item.path} className="relative group">
              <NavLink
                to={item.path}
                className={({ isActive }) => `
                  flex items-center ${isCollapsed ? 'justify-center' : 'space-x-4'} p-3 rounded-xl transition-all
                  ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-gray-400 hover:bg-gray-50'}
                `}
              >
                <span className="text-xl">{item.icon}</span>
                {!isCollapsed && <span className="font-bold text-sm">{item.label}</span>}
              </NavLink>

              {isCollapsed && (
                <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl">
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* --- LOGOUT BUTTON AT THE BOTTOM --- */}
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className={`
              w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-4'} p-3 rounded-xl 
              text-rose-500 hover:bg-rose-50 transition-all group relative
            `}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {!isCollapsed && <span className="font-bold text-sm uppercase tracking-tight">Sign Out</span>}
            
            {/* Tooltip for Logout when collapsed */}
            {isCollapsed && (
              <div className="absolute left-full ml-4 px-3 py-2 bg-rose-600 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                Sign Out
              </div>
            )}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-10 bg-gray-50/50">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;