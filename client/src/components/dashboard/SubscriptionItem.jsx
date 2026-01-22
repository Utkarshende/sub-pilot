import React from 'react'

function SubscriptionItem({ subscription, onDelete }) {
  // Logic: Destructure for cleaner code
  const { _id, name, amount, category } = subscription;

  return (
    <div className="flex items-center justify-between p-4 mb-3 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        {/* Visual Icon Placeholder based on category */}
        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
          {name.charAt(0).toUpperCase()}
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-800">{name}</h3>
          <p className="text-xs text-gray-500 uppercase tracking-wider">{category}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <span className="font-bold text-gray-700">₹{amount}</span>
        <button 
          onClick={() => onDelete(_id)}
          className="text-red-400 hover:text-red-600 p-2 transition-colors"
          title="Delete Subscription"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default SubscriptionItem