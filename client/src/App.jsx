import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

// Import Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Stats from './components/Stats';
import SubscriptionForm from './components/SubscriptionForm';

function App() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [editingSub, setEditingSub] = useState(null);
  const [budget, setBudget] = useState(50000);
  const [user, setUser] = useState(null); // NULL means logged out
  const navigate = useNavigate();

  // 1. DATA LOGIC (Keep this as is)
  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/subscriptions');
      setSubscriptions(response.data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => {
    if (user) fetchSubscriptions();
  }, [user]);

  // 2. LOGOUT LOGIC
  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  // 3. CALCULATIONS
  const totalMonthly = subscriptions.reduce((sum, sub) => sum + Number(sub.amount), 0);
  const percentUsed = (totalMonthly / budget) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVIGATION BAR */}
      <nav className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-black text-blue-600">SubPilot</Link>
          <div className="flex gap-6 items-center font-bold text-gray-600">
            {user ? (
              <>
                <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
                <Link to="/stats" className="hover:text-blue-600">Stats</Link>
                <button onClick={handleLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-600">Login</Link>
                <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Join Free</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />

          {/* DASHBOARD ROUTE */}
          <Route path="/dashboard" element={
            user ? (
              <div className="space-y-8">
                {/* Budget Tracker */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-xl">Monthly Budget</h2>
                    <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} className="w-32 border-b-2 border-blue-600 text-right font-bold text-xl outline-none" />
                  </div>
                  <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden">
                    <div className={`h-full ${percentUsed > 90 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${Math.min(percentUsed, 100)}%` }}></div>
                  </div>
                </div>

                <SubscriptionForm onAdd={(data) => setSubscriptions([...subscriptions, data])} />
                
                {/* List View */}
                <div className="grid gap-4">
                  {subscriptions.map(sub => (
                    <div key={sub._id} className="bg-white p-4 rounded-xl shadow-sm border flex justify-between">
                      <div><p className="font-bold">{sub.name}</p><p className="text-blue-600">₹{sub.amount}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-20">Please Login to view Dashboard</div>
            )
          } />

          <Route path="/stats" element={user ? <Stats subscriptions={subscriptions} /> : <Login setUser={setUser} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;