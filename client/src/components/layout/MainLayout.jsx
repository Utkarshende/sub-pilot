import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { COLORS } from '../../constants/theme';
import Navbar from './Navbar';

function MainLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false); // Logic: Sidebar toggle state
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/analytics', label: 'Analytics', icon: '📈' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* --- SIDEBAR --- */}
      <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white border-r flex flex-col transition-all duration-300 ease-in-out`}>
        <div className="p-6 flex items-center justify-between border-b">
          {!isCollapsed && <h1 className="text-xl font-black text-indigo-600 tracking-tighter">SUBPILOT</h1>}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-400"
          >
            {isCollapsed ? '→' : '←'}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} p-3 rounded-xl transition-all
                ${isActive ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-gray-400 hover:bg-gray-50'}
              `}
            >
              <span className="text-xl">{item.icon}</span>
              {!isCollapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar pageTitle={location.pathname === '/analytics' ? 'Analytics' : 'Dashboard'} />
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;