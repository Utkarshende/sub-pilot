import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { API_URLS, ALERT_MESSAGES, ALERT_TYPES } from '../constants/index.js';
import MainLayout from '../components/layout/MainLayout';
import SubscriptionList from '../components/dashboard/SubscriptionList';
import AddSubForm from '../components/dashboard/AddSubForm';
import Toast from '../components/ui/Toast';

function DashboardPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // 1. Fetch Logic
  const fetchSubscriptions = async () => {
    try {
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

  // 3. Delete Logic
  const handleDeleteSubscription = async (id) => {
    try {
      await axiosInstance.delete(`${API_URLS.SUBS}/${id}`);
      setSubscriptions(subscriptions.filter(sub => sub._id !== id));
      showToast(ALERT_MESSAGES.SUCCESS_DELETE, ALERT_TYPES.SUCCESS);
    } catch (error) {
      showToast(ALERT_MESSAGES.ERROR_DELETE, ALERT_TYPES.ERROR);
    }
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  const totalMonthly = subscriptions.reduce((sum, sub) => sum + Number(sub.amount), 0);

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8 p-4">
        
        {/* Stats Section */}
        <div className='bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-2xl shadow-lg'>
          <h1 className='text-blue-100 text-sm font-medium uppercase tracking-wider'>
            Total Monthly Spend
          </h1>
          <p className='text-5xl font-bold mt-2'>
            ₹{totalMonthly.toLocaleString()}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
           <div className="bg-white p-6 rounded-2xl border shadow-sm">
             <h2 className="text-xl font-bold mb-4">Add Subscription</h2>
             <AddSubForm onSave={handleAddSubscription} />
           </div>

           <div className="bg-white p-6 rounded-2xl border shadow-sm">
             <h2 className="text-xl font-bold mb-4">Your Subscriptions</h2>
             <SubscriptionList 
               subscriptions={subscriptions} 
               onDelete={handleDeleteSubscription} 
             />
           </div>
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

export default DashboardPage;