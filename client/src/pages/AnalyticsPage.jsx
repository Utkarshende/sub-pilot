import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import CategoryChart from '../components/analytics/CategoryChart';
import axiosInstance from '../api/axiosInstance';
import { API_URLS } from '../constants';

function AnalyticsPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axiosInstance.get(API_URLS.SUBS);
        setSubscriptions(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch failed", err);
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const total = subscriptions.reduce((sum, s) => sum + Number(s.amount || 0), 0);

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
            Financial Insights
          </h1>
          <p className="text-slate-400 font-medium">Detailed breakdown of your digital economy.</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chart Card (Span 2 columns) */}
          <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
               <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Spending Distribution</h3>
               <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-3 py-1 rounded-full uppercase">Live Data</span>
            </div>
            {loading ? (
              <div className="h-[300px] flex items-center justify-center text-slate-300 animate-pulse font-bold italic">Calculating metrics...</div>
            ) : (
              <CategoryChart subscriptions={subscriptions} />
            )}
          </div>

          {/* Totals Card */}
          <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white flex flex-col justify-center relative overflow-hidden shadow-2xl shadow-indigo-200">
            {/* Decorative background element */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
            
            <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Total Monthly Burn</p>
            <p className="text-6xl font-medium tracking-tighter italic">₹{total.toLocaleString('en-IN')}</p>
            
            <div className="mt-10 pt-10 border-t border-slate-800">
               <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Yearly Projection</p>
               <p className="text-3xl font-medium tracking-tighter text-indigo-400 italic">₹{(total * 12).toLocaleString('en-IN')}</p>
               <p className="mt-4 text-[10px] text-slate-500 leading-relaxed font-medium">
                 Based on your current {subscriptions.length} active subscriptions.
               </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default AnalyticsPage;