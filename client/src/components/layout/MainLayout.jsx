import React from 'react';

// LOGIC: 'children' allows us to wrap any page with a Sidebar and Navbar
function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Placeholder */}
      <aside className="w-64 bg-white border-r hidden md:block">
        <div className="p-6 font-bold text-xl">SubPilot</div>
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Navbar Placeholder */}
        <nav className="h-16 bg-white border-b flex items-center px-6">
          <span className="ml-auto">User Profile</span>
        </nav>

        {/* Dynamic Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;