import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import CategoryChart from '../components/analytics/CategoryChart';
import axiosInstance from '../api/axiosInstance';
import { API_URLS, BUDGET_KEY } from '../constants';

function AnalyticsPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Logic: Get the latest budget from LocalStorage
  const budget = Number(localStorage.getItem(BUDGET_KEY)) || 5000;

  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        setLoading(true);
        // Logic: Fetching directly from the database to ensure it's not "old" data
        const res = await axiosInstance.get(API_URLS.SUBS);
        setSubscriptions(res.data);
      } catch (err) {
        console.error("Error updating insights:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestData();
  }, []); // Logic: Runs every time the user enters this page

  // Logic: Recalculate totals based on the REAL data fetched above
  const total = subscriptions.reduce((sum, s) => sum + Number(s.amount || 0), 0);
  const isExceeding = total > budget;

  if (loading) return <MainLayout><div className="p-20 text-center font-black animate-pulse">SYNCING DATA...</div></MainLayout>;

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Financial Insights</h1>

        {/* Dynamic Warning Text */}
        {isExceeding && (
          <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 font-bold text-sm">
            ⚠️ You are currently ₹{(total - budget).toLocaleString()} over your monthly budget!
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 text-center uppercase tracking-widest text-xs">Spending Distribution</h3>
            {/* The Chart now gets the fresh 'subscriptions' array */}
            <CategoryChart subscriptions={subscriptions} />
          </div>

          <div className="bg-indigo-600 p-10 rounded-[2.5rem] text-white flex flex-col justify-center shadow-xl shadow-indigo-100">
            <p className="text-indigo-200 text-[10px] font-black uppercase tracking-[0.2em]">Total Monthly Burn</p>
            <p className="text-6xl font-black mt-2">₹{total.toLocaleString()}</p>
            
            <div className="mt-10 pt-8 border-t border-indigo-500">
               <p className="text-indigo-200 text-[10px] font-black uppercase tracking-[0.2em]">Annual Projection</p>
               <p className="text-2xl font-black mt-1">₹{(total * 12).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default AnalyticsPage;