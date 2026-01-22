import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar({ totalSpent = 0 }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <nav className="h-20 bg-white border-b border-slate-100 px-12 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-12">
        <Link to="/" className="text-2xl font-bold tracking-tighter text-indigo-600 italic">
          SUBPILOT
        </Link>
        
        {isLoggedIn && (
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className={`text-sm font-semibold transition ${location.pathname === '/' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>Home</Link>
            <Link to="/dashboard" className={`text-sm font-semibold transition ${location.pathname === '/dashboard' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>Dashboard</Link>
          <Link to="/profile" className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border border-indigo-100 hover:scale-105 transition shadow-sm">
  {localStorage.getItem('user_name')?.charAt(0).toUpperCase() || 'SP'}
</Link>
          </div>
        )}
      </div>

      <div className="flex items-center gap-8">
        {isLoggedIn ? (
          <div className="flex items-center gap-6 border-l pl-8 border-slate-100">
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Total Burn</p>
              <p className="text-sm font-medium text-slate-700">₹{Number(totalSpent).toLocaleString('en-IN')}</p>
            </div>
            <button onClick={() => { localStorage.clear(); navigate('/'); }} className="text-xs font-bold uppercase text-rose-500 hover:bg-rose-50 px-4 py-2 rounded-xl transition">Logout</button>
          </div>
        ) : (
          <Link to="/auth" className="bg-indigo-600 text-white px-8 py-3 rounded-2xl text-xs font-bold uppercase shadow-xl shadow-indigo-100 hover:scale-105 transition-all">Sign In</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;