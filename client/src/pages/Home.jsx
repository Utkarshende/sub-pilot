import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, ShieldCheck, PieChart } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
        Master Your <span className="text-blue-600">Subscriptions</span>
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mb-10">
        Stop losing money on forgotten trials. Track expenses, set budgets, and visualize your spending in one powerful dashboard.
      </p>

      <div className="flex gap-4">
        <Link to="/signup" className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-lg">
          Start Tracking for Free
        </Link>
        <Link to="/login" className="bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-full font-bold text-lg hover:border-blue-500 transition-all">
          Sign In
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-20">
        <FeatureCard icon={<ShieldCheck className="text-green-500" />} title="Secure" desc="Your data is encrypted and private." />
        <FeatureCard icon={<PieChart className="text-purple-500" />} title="Visual" desc="See exactly where your money goes." />
        <FeatureCard icon={<Rocket className="text-blue-500" />} title="Fast" desc="Add subscriptions in seconds." />
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <div className="mb-4 flex justify-center">{icon}</div>
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className="text-gray-500 text-sm">{desc}</p>
  </div>
);

export default Home;