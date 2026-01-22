import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import CategoryChart from '../components/analytics/CategoryChart';
import axiosInstance from '../api/axiosInstance';

function AnalyticsPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  
  // Logic: No SweetAlert in useEffect
  useEffect(() => {
    const fetch = async () => {
      const res = await axiosInstance.get('/subscriptions');
      setSubscriptions(res.data);
    };
    fetch();
  }, []);

  const budget = Number(localStorage.getItem('budget')) || 5000;
  const total = subscriptions.reduce((sum, s) => sum + Number(s.amount || 0), 0);
  const savings = Math.max(0, budget - total);

  return (
      <div className="max-w-6xl mx-auto space-y-10">
        <h1 className="text-4xl font-black tracking-tighter text-slate-900">Subscription Intelligence</h1>
        
        <div className="grid lg:grid-cols-2 gap-8">
           <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
              <CategoryChart subscriptions={subscriptions} />
           </div>

           <div className="bg-slate-900 p-10 rounded-[3rem] text-white space-y-8">
              <div>
                <p className="text-indigo-400 text-xs font-black uppercase tracking-widest mb-2">Monthly Calculation</p>
                <p className="text-xl font-medium leading-relaxed">
                  Your current monthly burn is <span className="text-white font-black">₹{total}</span>. 
                  By staying under your limit, you save <span className="text-emerald-400 font-black">₹{savings}</span>.
                </p>
              </div>
              
              <div className="pt-8 border-t border-slate-800">
                <p className="text-slate-500 text-xs font-bold uppercase mb-4">Savings Efficiency</p>
                <div className="flex items-end space-x-4">
                  <span className="text-6xl font-black">{Math.round((total/budget)*100)}%</span>
                  <span className="text-slate-400 text-sm mb-2">of budget utilized</span>
                </div>
              </div>
           </div>
        </div>
      </div>
  );
}
export default AnalyticsPage;