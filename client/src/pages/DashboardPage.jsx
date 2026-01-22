import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { API_URLS, ALERT_MESSAGES, ALERT_TYPES } from '../constants/index.js';
import MainLayout from '../components/layout/MainLayout';
import SubscriptionList from '../components/dashboard/SubscriptionList';
import AddSubForm from '../components/dashboard/AddSubForm';
import StatCard from '../components/dashboard/StatCard';
import Modal from '../components/ui/Modal';
import Toast from '../components/ui/Toast';

function DashboardPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [budget, setBudget] = useState(10000); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Logic: New state for search
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
      setIsModalOpen(false); // Logic: Close modal on success
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

  // 4. Search Filter Logic
  const filteredSubscriptions = subscriptions.filter(sub =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  const totalMonthly = subscriptions.reduce((sum, sub) => sum + Number(sub.amount), 0);
  const remaining = budget - totalMonthly;

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-8 p-4">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-gray-800 tracking-tight">Dashboard</h1>
            <p className="text-gray-500 text-sm">Overview of your active subscriptions</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold transition shadow-lg shadow-blue-100 flex items-center space-x-2"
          >
            <span>+ Add New Service</span>
          </button>
        </div>

        {/* 1. Quick Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Budget" amount={budget} color="blue" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
          <StatCard title="Current Spend" amount={totalMonthly} color="orange" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} />
          <StatCard title="Remaining" amount={remaining} color="green" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
        </div>

        {/* 2. Main List with Search Bar */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-gray-800">Your Subscriptions</h2>
            
            {/* Search Bar Input */}
            <div className="relative w-full md:w-64">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </span>
              <input 
                type="text"
                placeholder="Search services..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <SubscriptionList 
            subscriptions={filteredSubscriptions} 
            onDelete={handleDeleteSubscription} 
          />
        </div>

        {/* 3. Add Service Modal */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="Add New Subscription"
        >
          <AddSubForm onSave={handleAddSubscription} />
        </Modal>

        {/* 4. Notification Toast */}
        {toast.show && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast({ ...toast, show: false })} 
          />
        )}
      </div>
    </MainLayout>
  );
}

export default DashboardPage;