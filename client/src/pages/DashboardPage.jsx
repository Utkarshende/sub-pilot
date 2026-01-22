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
  const [editingSub, setEditingSub] = useState(null); // Logic: Track which sub is being edited
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
    // Logic: Force a storage event so other pages know budget changed
    window.dispatchEvent(new Event('storage'));
  };

  const handleEdit = (sub) => {
    setEditingSub(sub);
    setIsModalOpen(true);
  };

  const filteredSubs = subscriptions.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className={UI_STYLES.heroText}>Dashboard</h1>
            <div className="flex items-center space-x-2 bg-white p-2 px-4 rounded-xl border border-gray-100 shadow-sm">
               <span className="text-[10px] font-black text-gray-400 uppercase">Limit:</span>
               {isEditingBudget ? (
                 <input autoFocus type="number" className="w-24 font-black text-indigo-600 outline-none" value={tempBudget}
                   onChange={(e) => setTempBudget(e.target.value)} onBlur={handleSaveBudget} 
                   onKeyDown={(e) => e.key === 'Enter' && handleSaveBudget()}
                 />
               ) : (
                 <button onClick={() => setIsEditingBudget(true)} className="font-black text-gray-800">₹{budget.toLocaleString()}</button>
               )}
            </div>
          </div>
          <button onClick={() => { setEditingSub(null); setIsModalOpen(true); }} className={UI_STYLES.button}>+ Add New</button>
        </div>

        <div className={UI_STYLES.card}>
          <input type="text" placeholder="Search..." className={UI_STYLES.input} onChange={(e) => setSearchTerm(e.target.value)} />
          <div className="mt-8">
            <SubscriptionList 
               subscriptions={filteredSubs} 
               onDelete={(id) => setSubscriptions(s => s.filter(x => x._id !== id))}
               onEdit={handleEdit} // Logic: New Edit prop
            />
          </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingSub ? "Edit Service" : "New Service"}>
          <AddSubForm 
            initialData={editingSub} // Logic: Pass data if editing
            onSave={(data) => {
              if (editingSub) {
                setSubscriptions(prev => prev.map(s => s._id === data._id ? data : s));
              } else {
                setSubscriptions([...subscriptions, data]);
              }
              setIsModalOpen(false);
            }} 
          />
        </Modal>
      </div>
    </MainLayout>
  );
}

export default DashboardPage;