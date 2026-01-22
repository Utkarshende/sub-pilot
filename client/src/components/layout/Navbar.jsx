import React from 'react';

function Navbar({ pageTitle, totalSpent, budget }) {
  const percent = Math.round((totalSpent / budget) * 100);

  return (
    <header className="h-20 bg-white border-b px-8 flex items-center justify-between sticky top-0 z-10">
      <div>
        <h2 className="text-xl font-black text-gray-900 tracking-tight">{pageTitle}</h2>
      </div>

      <div className="flex items-center space-x-6">
        <div className="text-right hidden sm:block">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Budget Health</p>
          <div className="flex items-center space-x-2">
            <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full ${percent > 90 ? 'bg-rose-500' : 'bg-indigo-600'}`} 
                style={{ width: `${Math.min(percent, 100)}%` }}
              />
            </div>
            <span className="text-xs font-bold text-gray-700">{percent}%</span>
          </div>
        </div>
        <div className="h-8 w-px bg-gray-100" />
        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-black">
          U
        </div>
      </div>
    </header>
  );
}

export default Navbar;a