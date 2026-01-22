import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Modal from '../ui/Modal'; // Assuming you have a reusable Modal component

function MainLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // New state
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/analytics', label: 'Analytics', icon: '📈' },
  ];

  const confirmLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans text-gray-900">
      <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white border-r flex flex-col transition-all duration-300 ease-in-out z-20`}>
        {/* Logo Section */}
        <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} border-b h-20`}>
          {!isCollapsed && <h1 className="text-xl font-black text-indigo-600 tracking-tighter uppercase">SubPilot</h1>}
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400">
            {isCollapsed ? '→' : '←'}
          </button>
        </div>

        {/* Navigation */}
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
                {!isCollapsed && <span className="font-bold text-sm tracking-tight">{item.label}</span>}
              </NavLink>
              {isCollapsed && (
                <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl">
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom Logout Section */}
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={() => setShowLogoutConfirm(true)} // Open Confirmation
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-4'} p-3 rounded-xl text-rose-500 hover:bg-rose-50 transition-all group relative`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {!isCollapsed && <span className="font-bold text-sm uppercase tracking-tight">Sign Out</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-10 bg-gray-50/50">
          {children}
        </main>
      </div>

      {/* --- LOGOUT CONFIRMATION MODAL --- */}
      <Modal 
        isOpen={showLogoutConfirm} 
        onClose={() => setShowLogoutConfirm(false)} 
        title="Confirm Sign Out"
      >
        <div className="p-2">
          <p className="text-gray-500 font-medium mb-8">Are you sure you want to log out of SubPilot? You will need to sign in again to manage your subscriptions.</p>
          <div className="flex space-x-3">
            <button 
              onClick={confirmLogout}
              className="flex-1 bg-rose-600 text-white py-4 rounded-2xl font-black hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200"
            >
              YES, SIGN OUT
            </button>
            <button 
              onClick={() => setShowLogoutConfirm(false)}
              className="flex-1 bg-gray-100 text-gray-500 py-4 rounded-2xl font-black hover:bg-gray-200 transition-colors"
            >
              CANCEL
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default MainLayout;