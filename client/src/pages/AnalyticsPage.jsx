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

  const total = subscriptions.reduce((sum, s) => sum + Number(s.amount || 0), 0);
  
  // Logic: Group for the text breakdown
  const categorySummary = subscriptions.reduce((acc, sub) => {
    const cat = sub.category || 'Other';
    acc[cat] = (acc[cat] || 0) + Number(sub.amount || 0);
    return acc;
  }, {});

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-8 pb-10">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Chart Card */}
          <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border shadow-sm">
            <h3 className="text-lg font-black text-gray-800 mb-8 uppercase tracking-widest text-center">Spend Distribution</h3>
            <CategoryChart subscriptions={subscriptions} />
          </div>

          {/* Text Insights Card */}
          <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white flex flex-col shadow-2xl">
            <h3 className="text-indigo-400 font-black text-xs uppercase tracking-[0.2em] mb-6 text-center">Quick Breakdown</h3>
            <div className="space-y-6 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
              {Object.entries(categorySummary).map(([cat, amt]) => (
                <div key={cat} className="flex justify-between items-center border-b border-gray-800 pb-4">
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-tight">{cat}</p>
                    <p className="text-sm font-medium text-gray-200">
                      You spent <span className="text-indigo-400 font-black">₹{amt.toLocaleString()}</span> here
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-gray-600 uppercase">Weight</p>
                    <p className="text-xs font-bold">{Math.round((amt / total) * 100)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Total Summary Footer */}
        <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-indigo-200 text-xs font-black uppercase tracking-widest">Total Monthly Burn</p>
            <h2 className="text-5xl font-black mt-2 tracking-tighter">₹{total.toLocaleString()}</h2>
          </div>
          <div className="text-center md:text-right">
            <p className="text-indigo-200 text-xs font-black uppercase tracking-widest">Yearly Projection</p>
            <h2 className="text-3xl font-black mt-2 opacity-80">₹{(total * 12).toLocaleString()}</h2>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default AnalyticsPage;