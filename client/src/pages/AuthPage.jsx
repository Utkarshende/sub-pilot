import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { BTN_VARIANTS } from '../constants';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Logic: Determine which endpoint to hit based on 'isLogin' state
      const endpoint = isLogin ? `${API_URLS.AUTH}/login` : `${API_URLS.AUTH}/register`;
      const response = await axiosInstance.post(endpoint, formData);

      // 1. Store the VIP Pass (Token)
      localStorage.setItem('token', response.data.token);
      // 2. Store basic user info for the Profile UI
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // 3. Take them to the dashboard
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || ALERT_MESSAGES.ERROR_GENERIC);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <input
              type="text" placeholder="Full Name"
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          )}
          <input
            type="email" placeholder="Email Address"
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password" placeholder="Password"
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button onClick={() => setIsLogin(!isLogin)} className="text-blue-600 font-bold hover:underline">
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;