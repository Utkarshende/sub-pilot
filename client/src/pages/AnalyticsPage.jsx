import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import CategoryChart from '../components/analytics/CategoryChart';
import axiosInstance from '../api/axiosInstance';
import { API_URLS, BUDGET_KEY } from '../constants';

function AnalyticsPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const budget = Number(localStorage.getItem(BUDGET_KEY)) || 5000;

  useEffect(() => {
    const fetch = async () => {
      const res = await axiosInstance.get(API_URLS.SUBS);
      setSubscriptions(res.data);
    };
    fetch();
  }, []);

  const totalSpent = subscriptions.reduce((sum, s) => sum + Number(s.amount || 0), 0);
  const remaining = Math.max(0, budget - totalSpent);
  const isOverBudget = totalSpent > budget;

  // Logic: Calculate which category is the "Money Drain"
  const categoryTotals = subscriptions.reduce((acc, sub) => {
    acc[sub.category] = (acc[sub.category] || 0) + Number(sub.amount);
    return acc;
  }, {});

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-6 pb-12">
        
        {/* SECTION 1: THE LOGIC STATS (Budget vs Spent vs Remaining) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly Budget</p>
            <p className="text-3xl font-black text-slate-800 mt-1">₹{budget.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Spent</p>
            <p className={`text-3xl font-black mt-1 ${isOverBudget ? 'text-rose-500' : 'text-slate-800'}`}>
              ₹{totalSpent.toLocaleString()}
            </p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Remaining Balance</p>
            <p className={`text-3xl font-black mt-1 ${isOverBudget ? 'text-slate-300' : 'text-emerald-500'}`}>
              ₹{remaining.toLocaleString()}
            </p>
          </div>
        </div>

        {/* SECTION 2: COMPARISON & RECOMMENDATION */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6">Spending Analysis</h3>
            <div className="h-72">
               <CategoryChart subscriptions={subscriptions} />
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-6">
            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl flex-1">
              <h3 className="text-indigo-400 font-black text-xs uppercase tracking-widest mb-4">Smart Insight</h3>
              {isOverBudget ? (
                <p className="text-lg font-medium leading-relaxed">
                  You have exceeded your limit by <span className="text-rose-400 font-black">₹{(totalSpent - budget).toLocaleString()}</span>. 
                  We recommend reviewing your <span className="underline underline-offset-4">{topCategory?.[0]}</span> subscriptions to save money.
                </p>
              ) : (
                <p className="text-lg font-medium leading-relaxed">
                  Great job! You are currently <span className="text-emerald-400 font-black">₹{remaining.toLocaleString()}</span> under budget. 
                  Your biggest expense is <span className="text-indigo-300 font-black">{topCategory?.[0]}</span>.
                </p>
              )}
            </div>

            <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-lg">
               <p className="text-indigo-200 text-xs font-black uppercase tracking-widest">Efficiency Score</p>
               <div className="flex items-end justify-between mt-2">
                  <p className="text-5xl font-black">{Math.round((totalSpent / budget) * 100)}%</p>
                  <p className="text-xs text-indigo-200 font-medium">Of total budget used</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default AnalyticsPage;