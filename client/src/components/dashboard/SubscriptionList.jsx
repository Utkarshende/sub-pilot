import React from 'react';

function SubscriptionList({ subscriptions, onDelete, onEdit }) {
  // Helper to format date nicely
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-y-3">
        <thead>
          <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <th className="px-4">Service</th>
            <th className="px-4">Due Date</th>
            <th className="px-4 text-right">Amount</th>
            <th className="px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((sub) => (
            <tr key={sub._id} className="bg-slate-50/50 group hover:bg-white transition-all border border-transparent hover:border-slate-100">
              <td className="p-5 rounded-l-2xl font-black text-slate-800">{sub.name}</td>
              <td className="p-5 text-sm font-bold text-slate-500 italic">Next: {formatDate(sub.paymentDate)}</td>
              <td className="p-5 text-right font-black text-indigo-600 text-lg">₹{Number(sub.amount).toLocaleString()}</td>
              <td className="p-5 rounded-r-2xl text-right space-x-3">
                <button onClick={() => onEdit(sub)} className="text-slate-300 hover:text-indigo-600 transition-colors">
                   Edit
                </button>
                <button onClick={() => onDelete(sub._id)} className="text-slate-300 hover:text-rose-500 transition-colors">
                   Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SubscriptionList;d