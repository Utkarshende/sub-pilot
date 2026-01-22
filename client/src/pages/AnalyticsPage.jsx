import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import CategoryChart from '../components/analytics/CategoryChart';
import axiosInstance from '../api/axiosInstance';
import { API_URLS } from '../constants';

function AnalyticsPage() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axiosInstance.get(API_URLS.SUBS);
      setSubscriptions(res.data);
    };
    fetch();
  }, []);

  const total = subscriptions.reduce((sum, s) => sum + Number(s.amount || 0), 0);

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-black text-gray-900">Financial Insights</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Chart Card */}
          <div className="bg-white p-8 rounded-[2rem] border shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6">Spending by Category</h3>
            <CategoryChart subscriptions={subscriptions} />
          </div>

          {/* Totals Card */}
          <div className="bg-gray-900 p-8 rounded-[2rem] text-white flex flex-col justify-center">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total Monthly</p>
            <p className="text-5xl font-black mt-2">₹{total.toLocaleString()}</p>
            <div className="mt-8 pt-8 border-t border-gray-800">
               <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Yearly Projection</p>
               <p className="text-2xl font-black mt-1 text-indigo-400">₹{(total * 12).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default AnalyticsPage;