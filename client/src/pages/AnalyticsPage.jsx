import React, { useState, useEffect, useCallback } from 'react';
import MainLayout from '../components/layout/MainLayout';
import CategoryChart from '../components/analytics/CategoryChart';
import axiosInstance from '../api/axiosInstance';
import { API_URLS, BUDGET_KEY } from '../constants';
import { UI_STYLES } from '../constants/theme';

function AnalyticsPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const budget = Number(localStorage.getItem(BUDGET_KEY)) || 5000;

  // Logic: Memoized fetch function so it can be reused by the button
  const fetchAnalytics = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const res = await axiosInstance.get(API_URLS.SUBS);
      setSubscriptions(res.data);
    } catch (err) {
      console.error("Sync Error:", err);
    } finally {
      // Small delay so the user sees the "Refresh" animation
      setTimeout(() => setIsRefreshing(false), 500);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const total = subscriptions.reduce((sum, s) => sum + Number(s.amount || 0), 0);
  const isExceeding = total > budget;

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header with Refresh Button */}
        <div className="flex justify-between items-center">
          <h1 className={UI_STYLES.heroText}>Financial Insights</h1>
          <button 
            onClick={fetchAnalytics}
            disabled={isRefreshing}
            className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-xs font-black text-gray-500 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm active:scale-95 disabled:opacity-50"
          >
            <svg 
              className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} 
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>{isRefreshing ? 'SYNCING...' : 'REFRESH DATA'}</span>
          </button>
        </div>

        {/* Dynamic Insight Banner */}
        {isExceeding ? (
          <div className="bg-rose-50 border border-rose-100 p-6 rounded-[2rem] flex items-center space-x-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="text-3xl">📉</div>
            <div>
              <p className="text-rose-900 font-black text-sm uppercase tracking-tight">Budget Warning</p>
              <p className="text-rose-600 text-sm">
                You are currently <span className="font-black">₹{(total - budget).toLocaleString()}</span> over your monthly limit. Consider canceling unused services.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-[2rem] flex items-center space-x-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="text-3xl">✅</div>
            <div>
              <p className="text-emerald-900 font-black text-sm uppercase tracking-tight">On Track</p>
              <p className="text-emerald-600 text-sm">
                You are staying within your budget. You have <span className="font-black">₹{(budget - total).toLocaleString()}</span> remaining.
              </p>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Distribution Card */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center">
            <h3 className="font-black text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-8">Category Distribution</h3>
            <CategoryChart subscriptions={subscriptions} />
          </div>

          {/* Stats Summary Card */}
          <div className="bg-gray-900 p-10 rounded-[2.5rem] text-white flex flex-col justify-center shadow-2xl shadow-gray-200">
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">Current Monthly Burn</p>
            <p className="text-6xl font-black mt-2 tracking-tighter">₹{total.toLocaleString()}</p>
            
            <div className="mt-12 pt-8 border-t border-gray-800 flex justify-between items-end">
              <div>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">Yearly Projection</p>
                <p className="text-2xl font-black mt-1 text-indigo-400">₹{(total * 12).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">Services</p>
                <p className="text-xl font-black mt-1">{subscriptions.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default AnalyticsPage;