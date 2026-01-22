import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Added for redirect
import { UI_STYLES } from '../constants/theme';
import axiosInstance from '../api/axiosInstance';
import { API_URLS } from '../constants';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Logic: Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Logic: Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page refresh
    setError('');

    const endpoint = isLogin ? `${API_URLS.AUTH}/login` : `${API_URLS.AUTH}/register`;

    try {
      const response = await axiosInstance.post(endpoint, formData);
      
      // Save token to localStorage
      localStorage.setItem('token', response.data.token);
      
      // Success! Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-10">
        <div className="text-center">
          <h1 className={UI_STYLES.heroText}>{isLogin ? 'Welcome Back' : 'Join Us'}</h1>
          <p className="text-gray-500 mt-4 font-medium">Manage your digital life with Sub-Pilot.</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-rose-50 border border-rose-100 text-rose-600 p-4 rounded-xl text-sm font-bold animate-shake">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input 
            name="email"
            type="email" 
            placeholder="Email Address" 
            className={UI_STYLES.heavyInput} 
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input 
            name="password"
            type="password" 
            placeholder="Password" 
            className={UI_STYLES.heavyInput} 
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <button 
            type="submit"
            className="w-full py-5 rounded-2xl bg-indigo-600 text-white font-black text-xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-indigo-200"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <button 
          onClick={() => {
            setIsLogin(!isLogin);
            setError(''); // Clear errors when toggling
          }}
          className="w-full text-center text-gray-400 font-bold hover:text-indigo-600 transition"
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already a member? Login"}
        </button>
      </div>
    </div>
  );
}

export default AuthPage;