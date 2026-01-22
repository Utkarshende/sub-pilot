import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import MainLayout from '../components/layout/MainLayout';
import SubscriptionList from '../components/dashboard/SubscriptionList';
import Modal from '../components/ui/Modal';
import AddSubForm from '../components/dashboard/AddSubForm';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

function DashboardPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSub, setEditingSub] = useState(null);
  
  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem('user_monthly_budget');
    return saved ? Number(saved) : 5000;
  });
  const [isEditBudget, setIsEditBudget] = useState(false);

  const fetchSubs = async () => {
    try {
      const res = await axiosInstance.get('/subscriptions');
      setSubscriptions(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => { fetchSubs(); }, []);

  const totalSpent = subscriptions.reduce((sum, sub) => {
    const val = Number(sub.amount);
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  // LOGIC: Progress calculation
  const budgetValue = budget > 0 ? budget : 1; // Prevent division by zero
  const percentUsed = Math.min((totalSpent / budgetValue) * 100, 100);
  const isOverBudget = totalSpent > budget;

  const handleEdit = (sub) => {
    setEditingSub(sub);
    setIsModalOpen(true);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      try {
        await axiosInstance.delete(`/subscriptions/${id}`);
        fetchSubs();
      } catch (err) { console.error(err); }
    }
  };

  const handleSaveBudget = (e) => {
    const val = Number(e.target.value);
    setBudget(val);
    localStorage.setItem('user_monthly_budget', val);
  };

  return (
    <MainLayout>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        
        {/* TOP STATS CARDS */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Active Burn */}
          <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-xl flex flex-col justify-between">
            <div>
              <p className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-2">Monthly Expenditure</p>
              <h2 className="text-4xl font-medium tracking-tight">₹{totalSpent.toLocaleString('en-IN')}</h2>
            </div>
            {/* Small status text */}
            <p className="text-[10px] text-slate-500 mt-4 uppercase font-semibold">
              {isOverBudget ? "Warning: Over Budget" : "Spending is within limits"}
            </p>
          </div>

          {/* Monthly Budget + Progress Bar */}
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">Target Budget</p>
                {isEditBudget ? (
                  <input 
                    type="number"
                    autoFocus
                    className="text-3xl font-medium text-indigo-600 outline-none w-full border-b border-indigo-100"
                    value={budget}
                    onChange={handleSaveBudget}
                    onBlur={() => setIsEditBudget(false)}
                  />
                ) : (
                  <div onClick={() => setIsEditBudget(true)} className="cursor-pointer group flex items-baseline gap-3">
                    <h2 className="text-3xl font-medium text-slate-800">₹{budget.toLocaleString('en-IN')}</h2>
                    <span className="text-[10px] text-slate-300 opacity-0 group-hover:opacity-100 transition uppercase font-bold">Edit</span>
                  </div>
                )}
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">Utilization</p>
                <p className={`text-xl font-medium ${isOverBudget ? 'text-rose-500' : 'text-indigo-600'}`}>
                  {Math.round((totalSpent / budgetValue) * 100)}%
                </p>
              </div>
            </div>

            {/* PROGRESS BAR UI */}
            <div className="space-y-2">
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ease-out rounded-full ${isOverBudget ? 'bg-rose-500' : 'bg-indigo-600'}`}
                  style={{ width: `${percentUsed}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                <span>0%</span>
                <span>{isOverBudget ? 'Limit Exceeded' : 'Budget Limit'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SUBSCRIPTION LIST */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-semibold text-slate-800 tracking-tight italic uppercase">Subscription Registry</h3>
            <button 
              onClick={() => { setEditingSub(null); setIsModalOpen(true); }}
              className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
            >
              + Add Plan
            </button>
          </div>

          <SubscriptionList 
            subscriptions={subscriptions} 
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingSub(null); }} 
        title={editingSub ? "Modify Plan" : "New Plan Registration"}
      >
        <AddSubForm initialData={editingSub} onSave={() => { fetchSubs(); setIsModalOpen(false); }} />
      </Modal>
    </MainLayout>
    
  );
}

export default DashboardPage;