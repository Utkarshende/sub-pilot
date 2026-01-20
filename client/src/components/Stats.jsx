import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Stats = ({ subscriptions }) => {
  // 1. Transform data for the chart
  const dataMap = subscriptions.reduce((acc, sub) => {
    acc[sub.category] = (acc[sub.category] || 0) + Number(sub.amount);
    return acc;
  }, {});

  const chartData = Object.keys(dataMap).map(key => ({
    name: key,
    value: dataMap[key]
  }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mt-8">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Spending by Category</h2>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Stats;