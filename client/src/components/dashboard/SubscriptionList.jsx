import React from 'react';

function SubscriptionList({ subscriptions, onDelete, onEdit }) {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-y-4">
        <thead>
          <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <th className="px-4 pb-2">Plan</th>
            <th className="px-4 pb-2 text-center">Category</th>
            <th className="px-4 pb-2">Due Date</th>
            <th className="px-4 pb-2 text-right">Amount</th>
            <th className="px-4 pb-2 text-right">Manage</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((sub) => (
            <tr key={sub._id} className="bg-slate-50/50 group hover:bg-white transition-all border border-transparent hover:border-slate-200 shadow-sm rounded-2xl">
              <td className="p-5 rounded-l-2xl font-black text-slate-800">{sub.name}</td>
              <td className="p-5 text-center">
                <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider">
                  {sub.category || 'Other'}
                </span>
              </td>
              <td className="p-5 text-sm font-bold text-slate-500 italic">{formatDate(sub.paymentDate)}</td>
              <td className="p-5 text-right font-black text-indigo-600 text-lg">₹{Number(sub.amount).toLocaleString()}</td>
              <td className="p-5 rounded-r-2xl text-right space-x-4">
                <button onClick={() => onEdit(sub)} className="text-slate-400 hover:text-indigo-600 font-bold text-xs uppercase transition-colors">Edit</button>
                <button onClick={() => onDelete(sub._id)} className="text-slate-400 hover:text-rose-500 font-bold text-xs uppercase transition-colors">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SubscriptionList;