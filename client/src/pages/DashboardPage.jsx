import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import StatCard from '../components/dashboard/StatCard';
import { CreditCard, Zap } from 'lucide-react'; // Icons

function DashboardPage() {
  const [data, setData] = useState({ total: 0, count: 0 });

  useEffect(() => {
    // LOGIC: Using our Step 4 instance
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get('/subscriptions/stats');
        setData(res.data);
      } catch (err) {
        console.error("Dashboard Load Error", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <StatCard 
        title="Total Monthly" 
        value={`₹${data.total}`} 
        icon={CreditCard} 
        colorClass="bg-blue-100 text-blue-600" 
      />
      <StatCard 
        title="Active Subs" 
        value={data.count} 
        icon={Zap} 
        colorClass="bg-yellow-100 text-yellow-600" 
      />
    </div>
  );
}

export default DashboardPage;