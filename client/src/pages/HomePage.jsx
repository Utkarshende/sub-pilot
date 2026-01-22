import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Navbar from '../components/layout/Navbar';

function HomePage() {
  return (
    <div>
              <Navbar />
      <div className="bg-white">
        {/* BIG HERO IMAGE SECTION */}
          <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000" 
              alt="Dashboard Preview" 
              className="w-[300px] h-[300px] object-cover opacity-50 justify-center items-center"
            />
        <section className="max-w-7xl mx-auto px-6 pt-16 pb-24">
          <div className="relative rounded-[3rem] overflow-hidden bg-slate-900 h-[500px] mb-16 shadow-2xl">
          
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 text-center">
              <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-6">Visualizing Your Wealth.</h1>
              <p className="text-lg text-slate-300 max-w-xl mb-10 font-medium italic">Your subscriptions shouldn't be a mystery. See every rupee in a single glance.</p>
              <Link to="/auth" className="bg-indigo-600 hover:bg-indigo-500 text-white px-12 py-5 rounded-3xl font-bold uppercase tracking-widest transition-all">Start Commander</Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 py-10">
            <div className="space-y-4">
              <h3 className="text-xl font-bold italic tracking-tight">01. Automated Logic</h3>
              <p className="text-slate-500 font-medium">Connect your plans and let our system calculate your annual and monthly leakages.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold italic tracking-tight">02. Visual Badges</h3>
              <p className="text-slate-500 font-medium">Categorize spendings with interactive badges to identify high-cost habits instantly.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold italic tracking-tight">03. Secure Data</h3>
              <p className="text-slate-500 font-medium">Your financial data is encrypted and tied strictly to your unique account ID.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;