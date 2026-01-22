import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ totalSpent = 0 }) {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  // Logic: Ensure we never show NaN. Convert to Number and fallback to 0.

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="h-16 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold tracking-tighter text-indigo-600 italic">
        SUBPILOT
      </Link>

      <div className="flex items-center gap-8">
        {isLoggedIn ? (
          <>
            <button 
              onClick={handleLogout} 
              className="text-xs font-semibold uppercase text-rose-500 hover:bg-rose-50 px-3 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="flex gap-4">
            <Link to="/auth" className="text-xs font-semibold uppercase text-slate-600 px-4 py-2">Login</Link>
            <Link to="/auth" className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-xs font-semibold uppercase shadow-md shadow-indigo-100 hover:bg-indigo-700 transition">
              Join Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;