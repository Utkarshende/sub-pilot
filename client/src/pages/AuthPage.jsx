import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { BTN_VARIANTS } from '../constants';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-2">SubPilot</h1>
        <p className="text-center text-gray-500 mb-8">
          {isLogin ? "Welcome back!" : "Create your account"}
        </p>

        <form className="space-y-4">
          {!isLogin && (
            <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-xl outline-none" />
          )}
          <input type="email" placeholder="Email Address" className="w-full p-3 border rounded-xl outline-none" />
          <input type="password" placeholder="Password" className="w-full p-3 border rounded-xl outline-none" />
          
          <Button variant={BTN_VARIANTS.PRIMARY} className="w-full py-3 mt-2">
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </form>

        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-6 text-sm text-gray-500 hover:text-blue-600"
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}

export default AuthPage;