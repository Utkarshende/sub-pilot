import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ totalSpent = 0 }) {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  // Logic: Prevent NaN display
  const displayTotal = isNaN(totalSpent) ? 0 : totalSpent;

  return (
    <nav className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="text-2xl font-black tracking-tighter text-indigo-600 italic">
        SUBPILOT<span className="text-slate-300">.</span>
      </Link>

      <div className="flex items-center gap-8">
        {isLoggedIn ? (
          <>
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Burn</p>
              <p className="font-black text-slate-900">₹{displayTotal.toLocaleString()}</p>
            </div>
            <button onClick={handleLogout} className="text-xs font-black uppercase text-rose-500 hover:bg-rose-50 px-4 py-2 rounded-xl transition">
              Exit
            </button>
          </>
        ) : (
          <div className="flex gap-4">
            <Link to="/auth" className="text-sm font-black uppercase text-slate-600 hover:text-indigo-600 transition">Login</Link>
            <Link to="/auth" className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-black uppercase shadow-lg shadow-indigo-100">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;