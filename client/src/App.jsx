import React, { useState, useEffect } from 'react';
import axiosInstance from './api/axiosInstance'; // Logic: Uses our custom interceptor
import { API_URLS, ALERT_MESSAGES, ALERT_TYPES } from './constants/index.js'; // Logic: Centralized strings
import MainLayout from './components/layout/MainLayout';
import SubscriptionList from './components/dashboard/SubscriptionList';
import AddSubForm from './components/dashboard/AddSubForm';
import Toast from './components/ui/Toast';

function App() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // 1. Fetch Logic
  const fetchSubscriptions = async () => {
    try {
      // Logic: Path is relative because axiosInstance has the BaseURL
      const response = await axiosInstance.get(API_URLS.SUBS); 
      setSubscriptions(response.data);
    } catch (error) {
      showToast(ALERT_MESSAGES.ERROR_FETCH, ALERT_TYPES.ERROR);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  // 2. Add Logic
  const handleAddSubscription = async (formData) => {
    try {
      const response = await axiosInstance.post(API_URLS.SUBS, formData);
      setSubscriptions([...subscriptions, response.data]);
      showToast(ALERT_MESSAGES.SUCCESS_ADD, ALERT_TYPES.SUCCESS);
    } catch (error) {
      showToast(ALERT_MESSAGES.ERROR_SAVE, ALERT_TYPES.ERROR);
    }
  };

  const handleDeleteSubscription = async (id) => {
  // Logic: Optimistic UI update or wait for server? 
  // Let's wait for server to ensure data integrity.
  try {
    await axiosInstance.delete(`${API_URLS.SUBS}/${id}`);
    
    // Logic: Remove the deleted item from the local state array
    setSubscriptions(subscriptions.filter(sub => sub._id !== id));
    
    showToast(ALERT_MESSAGES.SUCCESS_DELETE, ALERT_TYPES.SUCCESS);
  } catch (error) {
    showToast(ALERT_MESSAGES.ERROR_DELETE, ALERT_TYPES.ERROR);
  }
};

  // 3. Helper for Notifications
  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  // 4. Calculation Logic
  const totalMonthly = subscriptions.reduce((sum, sub) => sum + Number(sub.amount), 0);

  return (
    <MainLayout> {/* Logic: Provides Sidebar & Navbar automatically */}
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Stats Section */}
        <div className='bg-blue-600 text-white p-8 rounded-2xl shadow-lg'>
          <h1 className='text-blue-100 text-sm font-medium uppercase tracking-wider'>
            Total Monthly Spend
          </h1>
          <p className='text-5xl font-bold mt-2'>
            ₹{totalMonthly.toLocaleString()}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
           {/* Components are now modular and clean */}
           <div className="bg-white p-6 rounded-2xl border shadow-sm">
             <h2 className="text-xl font-bold mb-4">Add Subscription</h2>
             <AddSubForm onSave={handleAddSubscription} />
           </div>

           <SubscriptionList 
             subscriptions={subscriptions} 
onDelete={handleDeleteSubscription}           />
        </div>
      </div>

      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast({ ...toast, show: false })} 
        />
      )}
    </MainLayout>
  );
}

export default App;