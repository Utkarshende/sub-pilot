import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubscriptionForm from './components/SubscriptionForm';
import Stats from './components/Stats'

function App() {
  // 1. STATE: The Application Memory
  const [subscriptions, setSubscriptions] = useState([]);
  const [editingSub, setEditingSub]=useState(null);
  const [budget, setBudget]=useState(50000);
 
  // 2. ACTION: Fetching data from Database (GET)
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

  

  // 4. ACTION: Sending new data to Database (POST)
 const handleAddSubscription = async (formData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/subscriptions', formData);
      setSubscriptions([...subscriptions, response.data]);
      alert("Subscription Added!");
    } catch (error) {
      console.error("Error adding:", error);
    }
  };

  // NEW/FIXED: The Delete Function (You were missing this!)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/subscriptions/${id}`);
      // Remove it from the screen immediately
      setSubscriptions(subscriptions.filter(sub => sub._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleUpdateSubscription = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/subscriptions/${id}`, updatedData);
      setSubscriptions(subscriptions.map(sub => 
        sub._id === id ? response.data : sub
      ));
      setEditingSub(null); // CRITICAL: Reset editing mode after success!
      alert("Updated Successfully");
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const totalMonthly = subscriptions.reduce((sum, sub) => {
    return sum + Number(sub.amount);
  }, 0);

   const percentUsed = (totalMonthly / budget) * 100;
// Logic for color: Red if > 90%, Yellow if > 70%, else Green
const barColor = percentUsed > 90 ? 'bg-red-500' : percentUsed > 70 ? 'bg-yellow-500' : 'bg-green-500';

const categoryData=subscriptions.reduce((acc,sub)=>{
  acc[sub.category]=(acc[sub.category] || 0) + Number(sub.amount);
  return acc;
},{});

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        {/* BUDGET SECTION */}
    <div className="bg-white p-6 rounded-xl shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-gray-700 text-lg">Monthly Budget</h2>
        <input 
          type="number" 
          value={budget} 
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-24 border-b-2 border-blue-500 text-right font-bold text-xl outline-none"
        />
      </div>
      
      {/* PROGRESS BAR */}
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 ${percentUsed > 90 ? 'bg-red-500' : 'bg-green-500'}`} 
          style={{ width: `${Math.min(percentUsed, 100)}%` }}
        ></div>
      </div>
      <p className="mt-2 text-sm text-gray-500 text-right">
        {percentUsed.toFixed(1)}% of budget used
      </p>
    </div>

    {/* SHOW CHART */}
    <Stats subscriptions={subscriptions} />
        
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">SubPilot Tracker</h1>
        <div className="bg-white p-4 rounded-lg shadow mb-6 flex justify-between items-center">
  <span className="font-semibold text-gray-700">Set Monthly Budget:</span>
  <input 
    type="number" 
    value={budget} 
    onChange={(e) => setBudget(Number(e.target.value))}
    className="border-b-2 border-blue-500 outline-none px-2 w-24 text-right font-bold"
  />
</div>
        <div className='bg-blue-600 text-white p-6 rounded-xl shadow-lg mb-8'>
          
          <h2 className='text-lg opacity-80'>Total Monthly Spend</h2>
          <p className='text-5xl font-bold mt-2'>₹{totalMonthly.toFixed(2)}</p>
        </div>

        {/* FIXED: Pass the extra props so the form knows how to EDIT */}
        <SubscriptionForm 
          onAdd={handleAddSubscription} 
          editingSub={editingSub} 
          onUpdate={handleUpdateSubscription}
        />

        <div className="mt-8 space-y-4">
          {subscriptions.map((sub) => (
            <div key={sub._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <span className="font-bold block">{sub.name}</span>
                <span className="text-blue-600">₹{sub.amount}</span>
              </div>

              <div className="space-x-4">
                {/* FIXED: Edit button now triggers editing mode */}
                <button 
                  onClick={() => setEditingSub(sub)} 
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>

                <button 
                  onClick={() => handleDelete(sub._id)}
                  className="text-red-400 hover:text-red-800 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;