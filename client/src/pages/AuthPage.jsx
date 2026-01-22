import React, { useState } from 'react';
import { UI_STYLES, COLORS } from '../constants/theme';
import axiosInstance from '../api/axiosInstance';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '' });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-10">
        <div className="text-center">
          <h1 className={UI_STYLES.heroText}>{isLogin ? 'Welcome' : 'Join Us'}</h1>
          <p className="text-gray-500 mt-4 font-medium">Manage your digital life with Sub-Pilot.</p>
        </div>

        <form className="space-y-4">
          <input 
            type="email" 
            placeholder="Email Address" 
            className={UI_STYLES.heavyInput} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className={UI_STYLES.heavyInput} 
          />
          <button className={`w-full py-5 rounded-2xl bg-${COLORS.primary} text-white font-black text-xl hover:scale-[1.02] transition-transform shadow-xl shadow-indigo-200`}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="w-full text-center text-gray-400 font-bold hover:text-indigo-600 transition"
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already a member? Login"}
        </button>
      </div>
    </div>
  );
}

export default AuthPage;