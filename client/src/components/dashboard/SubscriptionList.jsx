import React from 'react';

function SubscriptionList({ subscriptions, onDelete, onEdit }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-y-3">
        <thead>
          <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            <th className="px-4">Service</th>
            <th className="px-4">Category</th>
            <th className="px-4 text-right">Amount</th>
            <th className="px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((sub) => (
            <tr key={sub._id} className="bg-white group hover:shadow-md transition-all duration-300">
              <td className="p-4 rounded-l-2xl border-y border-l border-gray-50 font-bold text-gray-800">{sub.name}</td>
              <td className="p-4 border-y border-gray-50"><span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-[10px] font-bold uppercase">{sub.category}</span></td>
              <td className="p-4 border-y border-gray-50 text-right font-black text-indigo-600">₹{Number(sub.amount).toLocaleString()}</td>
              <td className="p-4 rounded-r-2xl border-y border-r border-gray-50 text-right space-x-2">
                {/* EDIT BUTTON */}
                <button onClick={() => onEdit(sub)} className="text-gray-300 hover:text-indigo-600 transition">
                   <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </button>
                {/* DELETE BUTTON */}
                <button onClick={() => onDelete(sub._id)} className="text-gray-300 hover:text-rose-500 transition">
                   <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SubscriptionList;