import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie 
} from 'recharts';

function CategoryChart({ subscriptions }) {
  // 1. Data Transformation
  const dataMap = subscriptions.reduce((acc, sub) => {
    const cat = sub.category || 'Other';
    acc[cat] = (acc[cat] || 0) + Number(sub.amount);
    return acc;
  }, {});

  const data = Object.keys(dataMap).map(name => ({
    name,
    value: dataMap[name] // Recharts Pie expects 'value'
  })).sort((a, b) => b.value - a.value);

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b', '#10b981'];

  if (data.length === 0) {
    return <div className="h-[300px] flex items-center justify-center text-slate-400 italic">No data available.</div>;
  }

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        
        {/* --- View 1: Bar Chart (The Comparison) --- */}
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={30}>
                {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* --- View 2: Donut Chart (The Share) --- */}
        <div className="h-[280px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          {/* Center Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Share</span>
            <span className="text-xl font-bold text-slate-800">%</span>
          </div>
        </div>
      </div>

      {/* --- Unified Interactive Legend --- */}
      <div className="mt-8 flex flex-wrap gap-4 justify-center pt-6 border-t border-slate-50">
        {data.map((entry, index) => {
          const total = data.reduce((sum, d) => sum + d.value, 0);
          const percent = Math.round((entry.value / total) * 100);
          
          return (
            <div key={entry.name} className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">{entry.name}</span>
              <span className="text-[10px] font-black text-indigo-500">{percent}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryChart;