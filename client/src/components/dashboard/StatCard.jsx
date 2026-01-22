import React from 'react'

function StatCard({ title, amount, color, icon }) {
  // Logic: Dynamic colors based on props
  const colorClasses = {
    blue: "bg-blue-600",
    green: "bg-emerald-500",
    orange: "bg-orange-500"
  };

  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center space-x-4">
      <div className={`p-3 rounded-xl text-white ${colorClasses[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-bold text-gray-800">₹{amount.toLocaleString()}</p>
      </div>
    </div>
  )
}

export default StatCard