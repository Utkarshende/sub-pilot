import React from 'react';
import Button from '../ui/Button';
import { BTN_VARIANTS, UI_STRINGS } from '../../constants';

function SubscriptionList({ subscriptions, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-50 bg-gray-50/30 flex justify-between items-center">
        <h3 className="font-bold text-gray-700">Your Subscriptions</h3>
        <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
          {subscriptions.length} Total
        </span>
      </div>

      <div className="divide-y divide-gray-100">
        {subscriptions.length === 0 ? (
          <div className="p-10 text-center text-gray-400">
            <p>No subscriptions found. Add one to get started!</p>
          </div>
        ) : (
          subscriptions.map((sub) => (
            <div key={sub._id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-semibold text-gray-800">{sub.name}</p>
                <p className="text-xs text-gray-400 capitalize">{sub.category}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-gray-700">₹{sub.amount}</span>
                <Button 
                  variant={BTN_VARIANTS.DANGER} 
                  className="px-3 py-1 text-xs"
                  onClick={() => onDelete(sub._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SubscriptionList;