import React, { useState, useEffect } from 'react';
import CategoryChart from '../components/analytics/CategoryChart';

function Analytics() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    // Mock data for now (Later this will be an API call)
    const mockData = [
      { id: 1, name: 'Netflix', price: 499, category: 'Entertainment' },
      { id: 2, name: 'Spotify', price: 119, category: 'Entertainment' },
      { id: 3, name: 'Google One', price: 130, category: 'Utilities' },
      { id: 4, name: 'Adobe CC', price: 4230, category: 'Work' },
      { id: 5, name: 'Gym', price: 2000, category: 'Fitness' },
    ];
    setSubscriptions(mockData);
  }, []);

  const totalMonthly = subscriptions.reduce((sum, sub) => sum + sub.price, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* The Chart Card */}
        <div className="lg:col-span-1">
          <CategoryChart subscriptions={subscriptions} />
        </div>

        {/* Financial Insights Card */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Financial Insights</h3>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="text-2xl">💡</div>
              <div>
                <h4 className="font-bold text-blue-900 text-sm">Saving Opportunity</h4>
                <p className="text-blue-700 text-xs mt-1">
                  You spend <span className="font-bold">₹{totalMonthly}</span> monthly. 
                  Reducing 'Entertainment' by 20% could save you ₹{Math.round(totalMonthly * 0.05)} per month.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl border">
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Annual Forecast</p>
                <p className="text-2xl font-black text-gray-800 mt-1">₹{(totalMonthly * 12).toLocaleString()}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border">
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Avg. Sub Price</p>
                <p className="text-2xl font-black text-gray-800 mt-1">₹{Math.round(totalMonthly / subscriptions.length)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;