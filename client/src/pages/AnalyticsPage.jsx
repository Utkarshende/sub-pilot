import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import CategoryChart from '../components/analytics/CategoryChart';
import { UI_STYLES } from '../constants/theme';

function AnalyticsPage({ subscriptions, budget }) {
  const total = subscriptions.reduce((sum, s) => sum + Number(s.amount), 0);
  const percent = Math.round((total / budget) * 100);

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-12 py-6">
        <h1 className={UI_STYLES.heroText}>Spending Insights</h1>

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Big Chart Area */}
          <div className="lg:col-span-7 bg-white p-12 rounded-[3rem] shadow-xl border border-gray-50">
            <div className="h-[450px] w-full"> 
               {/* Logic: Make the chart much bigger */}
               <CategoryChart subscriptions={subscriptions} isLarge={true} />
            </div>
          </div>

          {/* Big Stats Area */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Monthly Burn</p>
              <p className={UI_STYLES.statValue}>₹{total.toLocaleString()}</p>
              <div className="mt-4 flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-black ${percent > 90 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                  {percent}% of budget used
                </span>
              </div>
            </div>

            <div className="h-px bg-gray-100 w-full" />

            <div className="grid grid-cols-1 gap-6">
              <div className="p-8 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-200">
                <p className="text-indigo-100 font-medium opacity-80 uppercase text-xs tracking-widest">Yearly Forecast</p>
                <p className="text-4xl font-black mt-1">₹{(total * 12).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default AnalyticsPage;