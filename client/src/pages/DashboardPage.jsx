import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import MainLayout from '../components/layout/MainLayout';
import SubscriptionList from '../components/dashboard/SubscriptionList';
import Modal from '../components/ui/Modal';
import AddSubForm from '../components/dashboard/AddSubForm';
import { BUDGET_KEY } from '../constants';

function DashboardPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSub, setEditingSub] = useState(null);
  const [budget, setBudget] = useState(() => Number(localStorage.getItem(BUDGET_KEY)) || 5000);
  const [isEditBudget, setIsEditBudget] = useState(false);

  // 1. Fetch data from Database
  const fetchSubs = async () => {
    try {
      const res = await axiosInstance.get('/subscriptions');
      setSubscriptions(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => { fetchSubs(); }, []);

  // 2. Delete Logic
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/subscriptions/${id}`);
      fetchSubs(); // Refresh list
    } catch (err) { console.error(err); }
  };

  // 3. Edit Logic (Opens Modal with Data)
  const handleEdit = (sub) => {
    setEditingSub(sub);
    setIsModalOpen(true);
  };

  const totalSpent = subscriptions.reduce((sum, s) => sum + Number(s.amount || 0), 0);

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER: TOTAL SPENDING */}
        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-xl">
          <p className="text-indigo-400 text-xs font-black uppercase tracking-widest mb-2">Total Monthly Plan Cost</p>
          <h1 className="text-6xl font-black italic">₹{totalSpent.toLocaleString()}</h1>
          
          <div className="mt-6 flex items-center space-x-6">
            <div className="cursor-pointer" onClick={() => setIsEditBudget(true)}>
              <p className="text-[10px] text-slate-500 font-bold uppercase">Monthly Limit</p>
              {isEditBudget ? (
                <input 
                  autoFocus 
                  type="number" 
                  className="bg-transparent border-b border-indigo-500 outline-none font-bold text-xl w-32"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  onBlur={() => { localStorage.setItem(BUDGET_KEY, budget); setIsEditBudget(false); }}
                />
              ) : (
                <p className="text-xl font-bold hover:text-indigo-400 transition">₹{Number(budget).toLocaleString()}</p>
              )}
            </div>
          </div>
        </div>

        {/* SUBSCRIPTION LIST CONTAINER */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase">Your Active Plans</h2>
            <button 
              onClick={() => { setEditingSub(null); setIsModalOpen(true); }}
              className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs hover:bg-indigo-700 transition"
            >
              + Add New Subscription
            </button>
          </div>

          <SubscriptionList 
            subscriptions={subscriptions} 
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingSub ? "Edit Subscription" : "Add New Subscription"}
      >
        <AddSubForm 
          initialData={editingSub} 
          onSave={() => { 
            fetchSubs(); // Re-fetch all data to ensure dashboard updates
            setIsModalOpen(false); 
          }} 
        />
      </Modal>
    </MainLayout>
  );
}

export default DashboardPage;a