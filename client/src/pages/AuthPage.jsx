import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/users/login' : '/users/register';
    try {
      const res = await axiosInstance.post(endpoint, formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 p-10 border border-slate-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-slate-900 tracking-tight italic">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-sm text-slate-400 font-medium mt-2">
            {isLogin ? 'Enter your details to command your subs.' : 'Start your journey with SubPilot today.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-500 transition-all font-medium"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-500 transition-all font-medium"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-500 transition-all font-medium"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-semibold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all mt-4">
            {isLogin ? 'Sign In' : 'Join SubPilot'}
          </button>
        </form>

        <p className="text-center mt-8 text-sm font-medium text-slate-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-indigo-600 font-bold hover:underline"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;