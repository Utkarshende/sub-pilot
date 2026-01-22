import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 italic">
          STOP LEAKING <span className="text-indigo-600">CASH.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-slate-500 font-medium leading-relaxed mb-10">
          SubPilot is a high-performance subscription commander. Track every rupee, visualize your burn rate, and reach your financial goals faster by cutting the digital clutter.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/auth" className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl">
            Launch Commander
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="font-black text-xl mb-2 uppercase">Live Burn Rate</h3>
            <p className="text-slate-500 font-medium">See exactly how much money leaves your account every single month in real-time.</p>
          </div>
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="font-black text-xl mb-2 uppercase">Due Tracking</h3>
            <p className="text-slate-500 font-medium">Never get surprised by an auto-debit again. Track billing dates with precision.</p>
          </div>
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="font-black text-xl mb-2 uppercase">Financial Logic</h3>
            <p className="text-slate-500 font-medium">Categorize your spending to see which habits are draining your wealth.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;