import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // Logic: SweetAlert for the walkthrough
import MainLayout from '../components/layout/MainLayout';
import CategoryChart from '../components/analytics/CategoryChart';
import axiosInstance from '../api/axiosInstance';

function AnalyticsPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const budget = Number(localStorage.getItem('user_monthly_budget')) || 5000;
  const goalTarget = Number(localStorage.getItem('goal_target')) || 90000;
  const goalName = localStorage.getItem('goal_name') || "your goal";

  useEffect(() => {
    // Logic: SweetAlert popup on enter
    Swal.fire({
      title: 'Visual Insights',
      text: 'See your monthly subscription spending in visual format and track your progress.',
      icon: 'info',
      confirmButtonColor: '#4F46E5',
      timer: 3000
    });

    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axiosInstance.get('/subscriptions');
    setSubscriptions(res.data);
  };

  const totalSpent = subscriptions.reduce((sum, s) => sum + Number(s.amount || 0), 0);
  const monthlySavings = Math.max(0, budget - totalSpent);
  
  // Logic: The "Dreams to Reality" Calculation
  const monthsToGoal = monthlySavings > 0 ? Math.ceil(goalTarget / monthlySavings) : Infinity;

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="grid lg:grid-cols-2 gap-10">
          
          {/* THE CHART PANEL */}
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-10">Visual Breakdown</h3>
            <div className="h-80"><CategoryChart subscriptions={subscriptions} /></div>
          </div>

          {/* THE CALCULATION PANEL */}
          <div className="bg-slate-900 p-10 rounded-[3rem] text-white flex flex-col justify-center">
            <h3 className="text-indigo-400 font-black text-xs uppercase tracking-widest mb-4">Calculation Panel</h3>
            <p className="text-2xl font-bold leading-snug">
              By staying under your <span className="text-indigo-400">₹{budget}</span> limit, you are saving 
              <span className="text-emerald-400 font-black"> ₹{monthlySavings}</span> every month.
            </p>

            <div className="mt-10 p-6 bg-slate-800 rounded-2xl border border-slate-700">
              <p className="text-slate-400 text-xs font-bold uppercase mb-2">Road to {goalName}</p>
              <h4 className="text-4xl font-black">
                {monthsToGoal === Infinity ? "∞ Months" : `${monthsToGoal} Months`}
              </h4>
              <p className="text-slate-500 text-xs mt-2 italic">
                {monthsToGoal === Infinity 
                  ? "Warning: You aren't saving enough to reach your goal." 
                  : "Based on your current subscription burn rate."}
              </p>
            </div>
            
            <button className="mt-8 py-4 bg-indigo-600 rounded-xl font-black text-sm uppercase hover:bg-indigo-500 transition">
              Optimize Spending
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default AnalyticsPage;