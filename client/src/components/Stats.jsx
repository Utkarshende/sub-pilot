import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell, Legend 
} from 'recharts';

const Stats = ({ subscriptions }) => {
  // 1. DATA TRANSFORMATION: Group spending by category
  const dataMap = subscriptions.reduce((acc, sub) => {
    const category = sub.category || 'Other';
    acc[category] = (acc[category] || 0) + Number(sub.amount);
    return acc;
  }, {});

  // Convert object { Food: 500 } to array [{ name: 'Food', value: 500 }]
  const chartData = Object.keys(dataMap).map(key => ({
    name: key,
    value: dataMap[key]
  }));

  // Professional color palette
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-2xl font-bold text-gray-800">Spending Analysis</h1>

      {/* CHART CARD */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 text-gray-600">Monthly Expenses by Category</h3>
        
        {chartData.length > 0 ? (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <Tooltip 
                  cursor={{fill: '#f9fafb'}}
                  contentStyle={{borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-72 flex items-center justify-center text-gray-400 italic">
            Add subscriptions to see your chart
          </div>
        )}
      </div>

      {/* TEXT BREAKDOWN CARD */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 text-gray-600">Category Breakdown</h3>
        <div className="grid gap-4">
          {chartData.map((item, index) => (
            <div key={item.name} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                <span className="font-medium text-gray-700">{item.name}</span>
              </div>
              <span className="font-bold text-gray-900">₹{item.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;