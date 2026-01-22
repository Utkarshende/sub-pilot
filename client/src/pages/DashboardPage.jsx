import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { BUDGET_KEY } from '../constants';
import MainLayout from '../components/layout/MainLayout';
import SubscriptionList from '../components/dashboard/SubscriptionList';
import Modal from '../components/ui/Modal';
import AddSubForm from '../components/dashboard/AddSubForm';

function DashboardPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSub, setEditingSub] = useState(null);

  // Editable States
  const [budget, setBudget] = useState(() => Number(localStorage.getItem(BUDGET_KEY)) || 5000);
  const [goal, setGoal] = useState({ 
    name: localStorage.getItem('goal_name') || "MacBook Air", 
    target: Number(localStorage.getItem('goal_target')) || 90000 
  });
  
  const [isEditGoal, setIsEditGoal] = useState(false);
  const [isEditBudget, setIsEditBudget] = useState(false);

  useEffect(() => { fetchSubs(); }, []);

  const fetchSubs = async () => {
    const res = await axiosInstance.get('/subscriptions');
    setSubscriptions(res.data);
  };

  const saveGoal = () => {
    localStorage.setItem('goal_name', goal.name);
    localStorage.setItem('goal_target', goal.target);
    setIsEditGoal(false);
  };

  const totalSpent = subscriptions.reduce((sum, s) => sum + Number(s.amount || 0), 0);

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-8 pb-12">
        
        {/* EDITABLE GOAL SECTION */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Your Dream Goal</p>
              {isEditGoal ? (
                <div className="flex gap-2">
                  <input className="text-2xl font-black border-b-2 border-emerald-500 outline-none w-1/2" value={goal.name} onChange={(e) => setGoal({...goal, name: e.target.value})} />
                  <input className="text-2xl font-black border-b-2 border-emerald-500 outline-none w-1/3" type="number" value={goal.target} onChange={(e) => setGoal({...goal, target: e.target.value})} onBlur={saveGoal} />
                </div>
              ) : (
                <h2 onClick={() => setIsEditGoal(true)} className="text-3xl font-black text-slate-800 cursor-pointer hover:text-emerald-600 transition">
                  {goal.name} <span className="text-slate-300 text-xl font-medium ml-2">₹{Number(goal.target).toLocaleString()}</span>
                </h2>
              )}
            </div>
            
            {/* EDITABLE BUDGET BOX */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-right min-w-[200px]">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly Limit</p>
              {isEditBudget ? (
                <input autoFocus type="number" className="text-2xl font-black text-indigo-600 bg-transparent border-b-2 border-indigo-500 outline-none w-full text-right" 
                  value={budget} onChange={(e) => setBudget(e.target.value)} 
                  onBlur={() => { localStorage.setItem(BUDGET_KEY, budget); setIsEditBudget(false); }} 
                />
              ) : (
                <p onClick={() => setIsEditBudget(true)} className="text-2xl font-black text-slate-800 cursor-pointer hover:text-indigo-600">₹{Number(budget).toLocaleString()}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase italic">Active Plans</h3>
          <button onClick={() => { setEditingSub(null); setIsModalOpen(true); }} className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold hover:scale-105 transition shadow-lg shadow-indigo-100">
            + New Subscription
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-6">
          <SubscriptionList 
            subscriptions={subscriptions} 
            onDelete={(id) => setSubscriptions(s => s.filter(x => x._id !== id))}
            onEdit={(sub) => { setEditingSub(sub); setIsModalOpen(true); }}
          />
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingSub ? "Modify Plan" : "Track Plan"}>
          <AddSubForm initialData={editingSub} onSave={(data) => { fetchSubs(); setIsModalOpen(false); }} />
        </Modal>
      </div>
    </MainLayout>
  );
}

export default DashboardPage;