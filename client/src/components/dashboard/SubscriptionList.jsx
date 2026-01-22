import React from 'react';
import { SUBSCRIPTION_CATEGORIES } from '../../constants/categories';

function SubscriptionList({ subscriptions, onDelete, onEdit }) {
  
  // Logic 1: Better Date Formatter
  const formatDate = (dateValue) => {
    if (!dateValue) return "Date Not Set";
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  // Logic 2: Calculate Days Remaining
  const getDaysRemaining = (dateValue) => {
    if (!dateValue) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const billingDate = new Date(dateValue);
    billingDate.setHours(0, 0, 0, 0);

    // Calculate difference in time
    const diffTime = billingDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return { text: "Due Today", color: "text-rose-600 font-black" };
    if (diffDays < 0) return { text: "Past Due", color: "text-slate-400" };
    if (diffDays <= 3) return { text: `In ${diffDays} days`, color: "text-rose-500 font-bold" };
    return { text: `In ${diffDays} days`, color: "text-slate-500" };
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
          {subscriptions && subscriptions.length > 0 ? (
            subscriptions.map((sub) => {
              const countdown = getDaysRemaining(sub.paymentDate || sub.dueDate);
              const categoryStyle = SUBSCRIPTION_CATEGORIES.find(c => c.label === sub.category) || SUBSCRIPTION_CATEGORIES[5];
              return (
                <tr key={sub._id} className="bg-slate-50/50 group hover:bg-white transition-all border border-transparent hover:border-slate-200 shadow-sm rounded-2xl">
                  {/* Plan Name */}
                  <td className="p-5 rounded-l-2xl font-black text-slate-800">{sub.name}</td>
                  
                  {/* Category Badge */}
                  <td className="p-5 text-center">
                    <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider">
                      {sub.category || 'Other'}
                    </span>
                  </td>
                  
                  {/* Corrected Due Date + Countdown */}
                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-700">
                        {formatDate(sub.paymentDate || sub.dueDate)}
                      </span>
                      {countdown && (
                        <span className={`text-[10px] uppercase tracking-tighter ${countdown.color}`}>
                          {countdown.text}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="p-5 text-right font-black text-indigo-600 text-lg">
                    ₹{Number(sub.amount || 0).toLocaleString()}
                  </td>

                  {/* Actions */}
                  <td className="p-5 rounded-r-2xl text-right space-x-4">
                    <button onClick={() => onEdit(sub)} className="text-slate-400 hover:text-indigo-600 font-bold text-xs uppercase transition-colors">Edit</button>
<button 
  onClick={() => onDelete(sub._id, sub.name)} // Added sub.name here
  className="text-slate-400 hover:text-rose-500 font-bold text-xs uppercase transition-colors"
>
  Delete
</button>                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-10 text-slate-400 font-medium italic">
                No active subscriptions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SubscriptionList;