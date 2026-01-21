import React from 'react';

function StatCard({ title, value, icon: Icon, colorClass }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
      {/* Dynamic Icon with Dynamic Background Color */}
      <div className={`p-3 rounded-xl ${colorClass}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  );
}

export default StatCard;