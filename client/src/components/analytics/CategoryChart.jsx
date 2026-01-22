import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

function CategoryChart({ subscriptions }) {
  // Process data for chart
  const dataMap = subscriptions.reduce((acc, sub) => {
    const cat = sub.category || 'Other';
    acc[cat] = (acc[cat] || 0) + Number(sub.amount);
    return acc;
  }, {});

  const data = Object.keys(dataMap).map(name => ({
    name,
    amount: dataMap[name]
  })).sort((a, b) => b.amount - a.amount);

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b', '#10b981'];

  if (data.length === 0) {
    return <div className="h-[300px] flex items-center justify-center text-slate-400 italic font-medium">No subscription data found to visualize.</div>;
  }

  return (
    <div className="w-full h-full">
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              tickFormatter={(val) => `₹${val}`}
            />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="amount" radius={[8, 8, 0, 0]} barSize={40}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Legend */}
      <div className="mt-8 flex flex-wrap gap-6 justify-center border-t border-slate-50 pt-6">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{entry.name}</span>
            <span className="text-[10px] text-slate-300 font-medium">₹{entry.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryChart;