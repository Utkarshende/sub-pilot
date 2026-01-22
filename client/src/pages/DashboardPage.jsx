import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { API_URLS, BUDGET_KEY } from '../constants';
import { UI_STYLES, COLORS } from '../constants/theme';
import MainLayout from '../components/layout/MainLayout';
import SubscriptionList from '../components/dashboard/SubscriptionList';
import Modal from '../components/ui/Modal';
import AddSubForm from '../components/dashboard/AddSubForm';

function DashboardPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [budget, setBudget] = useState(() => Number(localStorage.getItem(BUDGET_KEY)) || 5000);

  useEffect(() => { fetchSubs(); }, []);

  const fetchSubs = async () => {
    const res = await axiosInstance.get(API_URLS.SUBS);
    setSubscriptions(res.data);
  };

  const totalSpent = subscriptions.reduce((sum, s) => sum + Number(s.amount), 0);
  const filteredSubs = subscriptions.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleBudgetEdit = () => {
    const val = prompt("Enter Monthly Budget:", budget);
    if (val) { setBudget(Number(val)); localStorage.setItem(BUDGET_KEY, val); }
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto space-y-12 pb-20">
        
        {/* Bolder Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className={UI_STYLES.heroText}>Subscriptions</h1>
            <div className="mt-4 flex items-center space-x-4">
               <button onClick={handleBudgetEdit} className="group">
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-indigo-600 transition">Monthly Budget</p>
                  <p className="text-2xl font-black text-gray-900">₹{budget.toLocaleString()}</p>
               </button>
               <div className="h-10 w-px bg-gray-200" />
               <div>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400">Total Spent</p>
                  <p className={`text-2xl font-black ${totalSpent > budget ? 'text-rose-500' : 'text-gray-900'}`}>
                    ₹{totalSpent.toLocaleString()}
                  </p>
               </div>
            </div>
          </div>
          
          <button onClick={() => setIsModalOpen(true)} className={UI_STYLES.button}>
            + Add Service
          </button>
        </div>

        {/* Big Search & List Section */}
        
        <div className={UI_STYLES.card}>
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Search your services..." 
              className={UI_STYLES.input}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-500 transition">
              <kbd className="hidden md:inline-block px-2 py-1 text-xs font-semibold bg-white border rounded-lg shadow-sm">/</kbd>
            </div>
          </div>
          
          <div className="mt-10">
            <SubscriptionList subscriptions={filteredSubs} onDelete={(id) => setSubscriptions(s => s.filter(x => x._id !== id))} />
          </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Subscription">
          <AddSubForm onSave={(data) => { setSubscriptions([...subscriptions, data]); setIsModalOpen(false); }} />
        </Modal>
      </div>
    </MainLayout>
  );
}

export default DashboardPage;