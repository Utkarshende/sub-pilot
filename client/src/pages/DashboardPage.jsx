import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { API_URLS, BUDGET_KEY } from '../constants';
import { UI_STYLES } from '../constants/theme';
import MainLayout from '../components/layout/MainLayout';
import SubscriptionList from '../components/dashboard/SubscriptionList';
import Modal from '../components/ui/Modal';
import AddSubForm from '../components/dashboard/AddSubForm';

function DashboardPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  
  const [budget, setBudget] = useState(() => Number(localStorage.getItem(BUDGET_KEY)) || 5000);
  const [tempBudget, setTempBudget] = useState(budget);

  useEffect(() => { fetchSubs(); }, []);

  const fetchSubs = async () => {
    try {
      const res = await axiosInstance.get(API_URLS.SUBS);
      setSubscriptions(res.data);
    } catch (err) { console.error(err); }
  };

  const handleSaveBudget = () => {
    setBudget(Number(tempBudget));
    localStorage.setItem(BUDGET_KEY, tempBudget);
    setIsEditingBudget(false);
  };

  const filteredSubs = subscriptions.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className={UI_STYLES.heroText}>Dashboard</h1>
            <div className="flex items-center space-x-2">
               <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Budget:</span>
               {isEditingBudget ? (
                 <input 
                   autoFocus
                   type="number"
                   className="w-20 font-black text-indigo-600 border-b-2 border-indigo-600 outline-none bg-transparent"
                   value={tempBudget}
                   onChange={(e) => setTempBudget(e.target.value)}
                   onBlur={handleSaveBudget}
                   onKeyDown={(e) => e.key === 'Enter' && handleSaveBudget()}
                 />
               ) : (
                 <button 
                   onClick={() => setIsEditingBudget(true)}
                   className="font-black text-gray-800 hover:text-indigo-600 transition"
                 >
                   ₹{budget.toLocaleString()}
                 </button>
               )}
            </div>
          </div>
          <button onClick={() => setIsModalOpen(true)} className={UI_STYLES.button}>+ Add New</button>
        </div>

        <div className={UI_STYLES.card}>
          <input 
            type="text" 
            placeholder="Search subscriptions..." 
            className={UI_STYLES.input}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="mt-8">
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