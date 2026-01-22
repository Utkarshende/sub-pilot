import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { API_URLS, ALERT_MESSAGES, ALERT_TYPES } from '../constants/index.js';
import MainLayout from '../components/layout/MainLayout';
import SubscriptionList from '../components/dashboard/SubscriptionList';
import AddSubForm from '../components/dashboard/AddSubForm';
import StatCard from '../components/dashboard/StatCard';
import Toast from '../components/ui/Toast';

function DashboardPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [budget, setBudget] = useState(10000); // Logic: Default monthly budget
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // 1. Fetch Subscriptions from Backend
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

  // 2. Add Subscription
  const handleAddSubscription = async (formData) => {
    try {
      const response = await axiosInstance.post(API_URLS.SUBS, formData);
      setSubscriptions([...subscriptions, response.data]);
      showToast(ALERT_MESSAGES.SUCCESS_ADD, ALERT_TYPES.SUCCESS);
    } catch (error) {
      showToast(ALERT_MESSAGES.ERROR_SAVE, ALERT_TYPES.ERROR);
    }
  };

  // 3. Delete Subscription
  const handleDeleteSubscription = async (id) => {
    try {
      await axiosInstance.delete(`${API_URLS.SUBS}/${id}`);
      setSubscriptions(subscriptions.filter(sub => sub._id !== id));
      showToast(ALERT_MESSAGES.SUCCESS_DELETE, ALERT_TYPES.SUCCESS);
    } catch (error) {
      showToast(ALERT_MESSAGES.ERROR_DELETE, ALERT_TYPES.ERROR);
    }
  };

  // 4. Helper for Notifications
  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  // 5. Financial Calculations
  const totalMonthly = subscriptions.reduce((sum, sub) => sum + Number(sub.amount), 0);
  const remaining = budget - totalMonthly;
  const percentageUsed = Math.min((totalMonthly / budget) * 100, 100);
  const isOverBudget = totalMonthly > budget;

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-8 p-4">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Financial Overview</h1>
            <p className="text-gray-500">Manage your monthly subscriptions and budget</p>
          </div>
          <button 
            onClick={() => {
              const newBudget = prompt("Enter your new monthly budget:", budget);
              if (newBudget) setBudget(Number(newBudget));
            }}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition shadow-sm"
          >
            Edit Budget
          </button>
        </div>

        {/* 1. Stat Cards Section */}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Monthly Budget" 
            amount={budget} 
            color="blue" 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
          <StatCard 
            title="Total Spent" 
            amount={totalMonthly} 
            color="orange" 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
          />
          <StatCard 
            title="Remaining" 
            amount={remaining} 
            color="green" 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
        </div>

        {/* 2. Budget Usage Progress Bar */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-tight">Budget Utilization</h3>
              <p className="text-xs text-gray-500">Current spending relative to your limit</p>
            </div>
            <span className={`text-lg font-bold ${isOverBudget ? 'text-red-500' : 'text-blue-600'}`}>
              {Math.round((totalMonthly / budget) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
            <div 
              className={`h-full transition-all duration-700 ease-out ${isOverBudget ? 'bg-red-500' : 'bg-blue-600'}`} 
              style={{ width: `${percentageUsed}%` }}
            ></div>
          </div>
          {isOverBudget && (
            <p className="mt-2 text-xs text-red-500 font-medium">⚠️ Warning: You have exceeded your monthly budget limit!</p>
          )}
        </div>

        {/* 3. Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
           {/* Left Column: Form */}
           <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit">
             <h2 className="text-lg font-bold text-gray-800 mb-6">Add New Subscription</h2>
             <AddSubForm onSave={handleAddSubscription} />
           </div>

           {/* Right Column: List */}
           <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
             <div className="flex items-center justify-between mb-6">
               <h2 className="text-lg font-bold text-gray-800">Your Active Plans</h2>
               <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                 {subscriptions.length} Services
               </span>
             </div>
             <SubscriptionList 
               subscriptions={subscriptions} 
               onDelete={handleDeleteSubscription} 
             />
           </div>
        </div>
      </div>

      {/* 4. Notification Toast */}
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