import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Link } from 'react-router-dom'; // NEW: Routing imports
import SubscriptionForm from './components/SubscriptionForm';
import Stats from './components/Stats';

function App() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [editingSub, setEditingSub] = useState(null);
  const [budget, setBudget] = useState(50000);

  // FETCH DATA
  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/subscriptions');
      setSubscriptions(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  // HANDLERS
  const handleAddSubscription = async (formData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/subscriptions', formData);
      setSubscriptions([...subscriptions, response.data]);
      alert("Subscription Added!");
    } catch (error) {
      console.error("Error adding:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/subscriptions/${id}`);
      setSubscriptions(subscriptions.filter(sub => sub._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleUpdateSubscription = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/subscriptions/${id}`, updatedData);
      setSubscriptions(subscriptions.map(sub => sub._id === id ? response.data : sub));
      setEditingSub(null);
      alert("Updated Successfully");
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  // CALCULATIONS
  const totalMonthly = subscriptions.reduce((sum, sub) => sum + Number(sub.amount), 0);
  const percentUsed = (totalMonthly / budget) * 100;

  return (
    <div className="min-h-screen bg-gray-100 pb-12">
      {/* NEW: NAVIGATION BAR */}
      <nav className="bg-white shadow-sm p-4 mb-8">
        <div className="max-w-2xl mx-auto flex justify-around font-bold">
          <Link to="/" className="text-blue-600 hover:text-blue-800">🏠 Dashboard</Link>
          <Link to="/stats" className="text-blue-600 hover:text-blue-800">📊 Spending Stats</Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4">
        <Routes>
          {/* PAGE 1: DASHBOARD */}
          <Route path="/" element={
            <>
              <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">SubPilot Tracker</h1>

              {/* BUDGET & PROGRESS SECTION */}
              <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-gray-700 text-lg">Monthly Budget</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">₹</span>
                    <input 
                      type="number" 
                      value={budget} 
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="w-24 border-b-2 border-blue-500 text-right font-bold text-xl outline-none"
                    />
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${percentUsed > 90 ? 'bg-red-500' : 'bg-green-500'}`} 
                    style={{ width: `${Math.min(percentUsed, 100)}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-sm text-gray-500 text-right">
                  {percentUsed.toFixed(1)}% of budget used (₹{totalMonthly} spent)
                </p>
              </div>

              <SubscriptionForm 
                onAdd={handleAddSubscription} 
                editingSub={editingSub} 
                onUpdate={handleUpdateSubscription}
              />

              <div className="mt-8 space-y-4">
                {subscriptions.map((sub) => (
                  <div key={sub._id} className="bg-white p-4 rounded shadow flex justify-between items-center hover:shadow-md transition-shadow">
                    <div>
                      <span className="font-bold block text-gray-800">{sub.name}</span>
                      <span className="text-blue-600 font-medium">₹{sub.amount}</span>
                      <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">{sub.category}</span>
                    </div>
                    <div className="space-x-4">
                      <button onClick={() => setEditingSub(sub)} className="text-blue-500 hover:text-blue-700">Edit</button>
                      <button onClick={() => handleDelete(sub._id)} className="text-red-400 hover:text-red-600">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          } />

          {/* PAGE 2: STATS */}
          <Route path="/stats" element={<Stats subscriptions={subscriptions} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;