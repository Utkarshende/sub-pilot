import React from 'react'
import SubscriptionItem from './SubscriptionItem'

function SubscriptionList({ subscriptions, onDelete }) {
  return (
    <div className="mt-2">
      {subscriptions.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-400 italic">No subscriptions added yet.</p>
          <p className="text-sm text-gray-400">Add one on the left to get started!</p>
        </div>
      ) : (
        <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {subscriptions.map((sub) => (
            <SubscriptionItem 
              key={sub._id} 
              subscription={sub} 
              onDelete={onDelete} 
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default SubscriptionList