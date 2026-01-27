import React, { useState, useContext } from 'react';
import API from '../api/axiosInstance';
import { AuthContext } from '../context/AuthContext';

const AuthPage = () => {
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Determine which endpoint to hit based on the mode
    const endpoint = isLogin ? '/users/login' : '/users/register';
    
    try {
     const { data } = await API.post('/users/login', formData);
localStorage.setItem('userInfo', JSON.stringify(data));
login(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-indigo-600 mb-6">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>

        {error && <p className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input 
              type="text" placeholder="Full Name" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          )}
          <input 
            type="email" placeholder="Email Address" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input 
            type="password" placeholder="Password" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          <button className="w-full bg-indigo-600 text-white p-3 rounded-lg font-bold hover:bg-indigo-700 transition duration-300">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-indigo-600 font-bold hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;