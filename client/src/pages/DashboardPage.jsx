import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { BUDGET_KEY } from '../constants';
import { UI_STYLES } from '../constants/theme';
import MainLayout from '../components/layout/MainLayout';
import SubscriptionList from '../components/dashboard/SubscriptionList';

function DashboardPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [budget, setBudget] = useState(() => Number(localStorage.getItem(BUDGET_KEY)) || 5000);
  
  // Logic: Mock Goal (In a real app, this would come from a 'goals' database table)
  const [goal] = useState({ name: "MacBook Air M3", target: 90000 });
  const [savedSoFar, setSavedSoFar] = useState(15000); 

  useEffect(() => {
    const fetchSubs = async () => {
      const res = await axiosInstance.get('/subscriptions');
      setSubscriptions(res.data);
    };
    fetchSubs();
  }, []);

  const totalSpent = subscriptions.reduce((sum, s) => sum + Number(s.amount || 0), 0);
  const monthlySavings = Math.max(0, budget - totalSpent);
  const progressPercent = Math.min(100, (savedSoFar / goal.target) * 100);

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-8 pb-12">
        
        {/* --- SECTION 1: THE SAVINGS GOAL TRACKER --- */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm overflow-hidden relative">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Goal Tracker</p>
              <h2 className="text-3xl font-black text-slate-800">{goal.name}</h2>
              <p className="text-sm text-slate-400 font-medium italic">
                You're saving <span className="text-emerald-500 font-bold">₹{monthlySavings.toLocaleString()}</span> this month towards this goal.
              </p>
            </div>
            
            <div className="text-right flex flex-col items-end">
              <p className="text-4xl font-black text-slate-900">₹{savedSoFar.toLocaleString()} <span className="text-slate-300 text-xl">/ ₹{goal.target.toLocaleString()}</span></p>
              <div className="w-64 h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-1000 ease-out" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
          {/* Subtle Background Pattern */}
          <div className="absolute -right-10 -bottom-10 text-emerald-50 opacity-[0.03] scale-150 rotate-12">
            <svg width="200" height="200" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>
          </div>
        </div>

        {/* --- SECTION 2: BUDGET SUMMARY BAR --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-indigo-600 p-8 rounded-[2rem] text-white">
            <p className="text-indigo-200 text-[10px] font-black uppercase tracking-widest">Available to Spend</p>
            <p className="text-4xl font-black mt-1">₹{(budget - totalSpent).toLocaleString()}</p>
          </div>
          <div className="bg-slate-900 p-8 rounded-[2rem] text-white">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Monthly Burn</p>
            <p className="text-4xl font-black mt-1">₹{totalSpent.toLocaleString()}</p>
          </div>
        </div>

        {/* --- SECTION 3: REFINED SUBSCRIPTION LIST --- */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
           <div className="flex justify-between items-center mb-8">
              <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">Active Subscriptions</h3>
              <div className="text-xs font-bold text-slate-400">{subscriptions.length} Services Tracked</div>
           </div>
           <SubscriptionList subscriptions={subscriptions} />
        </div>

      </div>
    </MainLayout>
  );
}

export default DashboardPage;