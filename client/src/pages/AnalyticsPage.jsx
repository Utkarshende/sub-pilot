import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import CategoryChart from '../components/analytics/CategoryChart';
import { UI_STYLES } from '../constants/theme';
import axiosInstance from '../api/axiosInstance';
import { API_URLS, BUDGET_KEY } from '../constants';

function AnalyticsPage() {
  const [subscriptions, setSubscriptions] = useState([]); // Default to empty array
  const [loading, setLoading] = useState(true);
  const budget = Number(localStorage.getItem(BUDGET_KEY)) || 5000;

  useEffect(() => {
    const fetchSubs = async () => {
      try {
        const res = await axiosInstance.get(API_URLS.SUBS);
        // Logic: Ensure we are setting an array even if the API response is weird
        setSubscriptions(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubs();
  }, []);

  // Logic: Safe calculation using optional chaining or default empty array
  const total = (subscriptions || []).reduce((sum, s) => sum + Number(s.amount || 0), 0);
  const percent = budget > 0 ? Math.round((total / budget) * 100) : 0;

  if (loading) return <MainLayout><div className="p-20 text-center font-black animate-pulse">LOADING ANALYTICS...</div></MainLayout>;

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-12 py-6">
        <h1 className={UI_STYLES.heroText}>Spending Insights</h1>

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Big Chart Area */}
          <div className="lg:col-span-7 bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-indigo-100/50 border border-gray-50">
             <div className="h-[450px] w-full"> 
                <CategoryChart subscriptions={subscriptions} />
             </div>
          </div>

          {/* Big Stats Area */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-xs">Total Monthly Burn</p>
              <p className="text-7xl font-black tracking-tighter text-gray-900 mt-2">₹{total.toLocaleString()}</p>
              <div className="mt-6">
                <div className="flex justify-between mb-2 text-xs font-black uppercase">
                   <span className="text-gray-400">Budget Usage</span>
                   <span className={percent > 100 ? 'text-rose-500' : 'text-indigo-600'}>{percent}%</span>
                </div>
                <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden">
                   <div 
                     className={`h-full transition-all duration-1000 ${percent > 100 ? 'bg-rose-500' : 'bg-indigo-600'}`} 
                     style={{ width: `${Math.min(percent, 100)}%` }}
                   />
                </div>
              </div>
            </div>

            <div className="p-10 bg-gray-900 rounded-[2.5rem] text-white shadow-2xl shadow-gray-400">
               <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Yearly Commitment</p>
               <p className="text-4xl font-black mt-2">₹{(total * 12).toLocaleString()}</p>
               <p className="text-gray-500 text-xs mt-4">Based on {subscriptions.length} active services</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default AnalyticsPage;