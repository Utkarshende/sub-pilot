import React, { useState, useEffect } from 'react'
import MainLayout from '../components/layout/MainLayout'
import StatCard from '../components/dashboard/StatCard'
import axiosInstance from '../api/axiosInstance'
import { API_URLS } from '../constants'

function AnalyticsPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [budget] = useState(10000); // In a real app, fetch this from User Profile

  useEffect(() => {
    const fetchSubs = async () => {
      const res = await axiosInstance.get(API_URLS.SUBS);
      setSubscriptions(res.data);
    };
    fetchSubs();
  }, []);

  const total = subscriptions.reduce((sum, sub) => sum + Number(sub.amount), 0);
  const remaining = budget - total;

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-gray-800">Financial Analytics</h1>
        
        {/* The Stat Cards you requested on their own page */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Budget" amount={budget} color="blue" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
          <StatCard title="Actual Spend" amount={total} color="orange" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} />
          <StatCard title="Remaining" amount={remaining} color="green" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
        </div>

        {/* Category Breakdown would go here next */}
        <div className="bg-white p-8 rounded-2xl border shadow-sm">
           <h3 className="font-bold mb-4">Spending by Category</h3>
           <p className="text-gray-400 italic text-sm">Chart coming soon...</p>
        </div>
      </div>
    </MainLayout>
  )
}

export default AnalyticsPage