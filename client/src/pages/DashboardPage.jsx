import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import MainLayout from '../components/layout/MainLayout';
import SubscriptionList from '../components/dashboard/SubscriptionList';
import Modal from '../components/ui/Modal';
import AddSubForm from '../components/dashboard/AddSubForm';

function DashboardPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSub, setEditingSub] = useState(null);
  const [budget] = useState(() => Number(localStorage.getItem('user_monthly_budget')) || 5000);

  const fetchSubs = async () => {
    try {
      const res = await axiosInstance.get('/subscriptions');
      setSubscriptions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchSubs(); }, []);

  const totalSpent = subscriptions.reduce((sum, s) => sum + Number(s.amount || 0), 0);

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* TOP METRIC CARD */}
        <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <p className="text-indigo-400 text-xs font-black uppercase tracking-widest mb-2">Monthly Expenditure</p>
              <h1 className="text-7xl font-black italic tracking-tighter">₹{totalSpent.toLocaleString()}</h1>
            </div>
            <div className="text-center md:text-right">
              <p className="text-slate-500 text-[10px] font-black uppercase mb-1">Budget Utilization</p>
              <p className="text-3xl font-black text-indigo-300">{Math.round((totalSpent/budget)*100)}%</p>
            </div>
          </div>
        </div>

        {/* LIST SECTION */}
        <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter">Subscription Registry</h2>
            <button 
              onClick={() => { setEditingSub(null); setIsModalOpen(true); }}
              className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all active:scale-95 shadow-xl shadow-indigo-100"
            >
              Add New Plan
            </button>
          </div>

          <SubscriptionList 
            subscriptions={subscriptions} 
            onEdit={(sub) => { setEditingSub(sub); setIsModalOpen(true); }}
            onDelete={async (id) => {
              if(window.confirm("Remove this plan?")) {
                await axiosInstance.delete(`/subscriptions/${id}`);
                fetchSubs();
              }
            }}
          />
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingSub ? "Update Plan" : "New Registration"}
      >
        <AddSubForm initialData={editingSub} onSave={() => { fetchSubs(); setIsModalOpen(false); }} />
      </Modal>
    </MainLayout>
  );
}

export default DashboardPage;