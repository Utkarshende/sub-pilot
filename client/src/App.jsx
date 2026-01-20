import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubscriptionForm from './components/SubscriptionForm';

function App() {
  // 1. STATE: The Application Memory
  const [subscriptions, setSubscriptions] = useState([]);

  // 2. ACTION: Fetching data from Database (GET)
  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/subscriptions');
      setSubscriptions(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // 3. EFFECT: Run fetch when the page first loads
  useEffect(() => {
    fetchSubscriptions();
  }, []);

  // 4. ACTION: Sending new data to Database (POST)
  const handleAddSubscription = async (formData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/subscriptions', formData);
      
      // Update UI immediately by adding the new item to our list
      setSubscriptions([...subscriptions, response.data]);
      alert("Subscription Added!");
    } catch (error) {
      console.error("Error adding subscription:", error);
      alert("Failed to add to database.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">SubPilot Tracker</h1>
        
        {/* Pass the Action to the Component via Props */}
        <SubscriptionForm onAdd={handleAddSubscription} />

        {/* Display the List */}
        <div className="mt-8 space-y-4">
          {subscriptions.map((sub) => (
            <div key={sub._id} className="bg-white p-4 rounded shadow flex justify-between">
              <span className="font-bold">{sub.name}</span>
              <span className="text-blue-600">₹{sub.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;