import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { API_URLS, BUDGET_KEY } from '../constants';
import { UI_STYLES, COLORS } from '../constants/theme';

import MainLayout from '../components/layout/MainLayout';
import SubscriptionList from '../components/dashboard/SubscriptionList';
import Modal from '../components/ui/Modal';
import AddSubForm from '../components/dashboard/AddSubForm';

function DashboardPage() {
  // --- State Management ---
  const [subscriptions, setSubscriptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  
  // Logic: Initialize budget from local storage
  const [budget, setBudget] = useState(() => 
    Number(localStorage.getItem(BUDGET_KEY)) || 5000
  );
  const [tempBudget, setTempBudget] = useState(budget);

  // --- Data Fetching ---
  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await axiosInstance.get(API_URLS.SUBS);
      setSubscriptions(response.data);
    } catch (err) {
      console.error("Failed to fetch subscriptions", err);
    }
  };

  // --- Financial Logic ---
  const totalSpent = (subscriptions || []).reduce((sum, s) => sum + Number(s.amount || 0), 0);
  const isExceeding = totalSpent > budget;
  const budgetUsageWidth = Math.min((totalSpent / budget) * 100, 100);

  // --- Handlers ---
  const handleSaveBudget = () => {
    const newBudget = Number(tempBudget);
    if (!isNaN(newBudget) && newBudget > 0) {
      setBudget(newBudget);
      localStorage.setItem(BUDGET_KEY, newBudget);
    }
    setIsEditingBudget(false);
  };

  const filteredSubs = subscriptions.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto space-y-10 pb-20">
        
        {/* 1. EXCEEDED BUDGET ALERT */}
        {isExceeding && (
          <div className="bg-rose-50 border border-rose-100 p-5 rounded-[2rem] flex items-center justify-between animate-in slide-in-from-top duration-500">
            <div className="flex items-center space-x-4">
              <div className="bg-rose-500 p-2 rounded-full text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <div>
                <p className="text-rose-900 font-black text-sm uppercase tracking-tight">Budget Threshold Exceeded</p>
                <p className="text-rose-600 text-xs font-medium">You are spending ₹{(totalSpent - budget).toLocaleString()} over your limit.</p>
              </div>
            </div>
          </div>
        )}

        {/* 2. HEADER SECTION */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-6">
            <h1 className={UI_STYLES.heroText}>Subscriptions</h1>
            
            <div className="flex items-center space-x-10">
              {/* Standard Inline Budget Card */}
              <div className="group">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Monthly Budget</p>
                {isEditingBudget ? (
                  <input 
                    type="number"
                    autoFocus
                    className="text-3xl font-black text-indigo-600 bg-transparent border-b-4 border-indigo-600 outline-none w-32"
                    value={tempBudget}
                    onChange={(e) => setTempBudget(e.target.value)}
                    onBlur={handleSaveBudget}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveBudget()}
                  />
                ) : (
                  <div 
                    onClick={() => setIsEditingBudget(true)}
                    className="flex items-baseline cursor-pointer group"
                  >
                    <span className="text-3xl font-black text-gray-900 group-hover:text-indigo-600 transition">₹{budget.toLocaleString()}</span>
                    <span className="ml-2 text-xs font-bold text-gray-300 opacity-0 group-hover:opacity-100 transition">Edit</span>
                  </div>
                )}
              </div>

              {/* Spend Card */}
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Total Spend</p>
                <p className={`text-3xl font-black ${isExceeding ? 'text-rose-500' : 'text-gray-900'}`}>
                  ₹{totalSpent.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Subtle Progress Tracker */}
            <div className="w-full max-w-md bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ease-out ${isExceeding ? 'bg-rose-500' : 'bg-indigo-600'}`} 
                style={{ width: `${budgetUsageWidth}%` }}
              />
            </div>
          </div>

          <button onClick={() => setIsModalOpen(true)} className={UI_STYLES.button}>
            + Add New Service
          </button>
        </div>

        {/* 3. SUBSCRIPTION LIST CARD */}
        <div className={UI_STYLES.card}>
          <div className="relative mb-8">
            <input 
              type="text" 
              placeholder="Filter by name..." 
              className={UI_STYLES.input}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>

          <SubscriptionList 
            subscriptions={filteredSubs} 
            onDelete={(id) => setSubscriptions(prev => prev.filter(s => s._id !== id))} 
          />
        </div>

        {/* 4. MODAL COMPONENT */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="Track New Service"
        >
          <AddSubForm 
            onSave={(data) => {
              setSubscriptions(prev => [...prev, data]);
              setIsModalOpen(false);
            }} 
          />
        </Modal>

      </div>
    </MainLayout>
  );
}

export default DashboardPage;