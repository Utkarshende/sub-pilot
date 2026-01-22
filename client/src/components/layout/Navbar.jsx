import React from 'react'

function Navbar({ pageTitle }) {
  // Logic: Format today's date professionally
  const today = new Date().toLocaleDateString('en-IN', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center space-x-2">
        {/* Mobile menu trigger could go here later */}
        <h2 className="text-gray-800 font-bold text-lg">{pageTitle}</h2>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden md:block text-sm text-gray-400 font-medium">
          {today}
        </div>
        
        {/* Logic: Quick actions like Notifications could go here */}
        <button className="p-2 text-gray-400 hover:text-blue-600 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v1m6 0H9" />
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Navbar