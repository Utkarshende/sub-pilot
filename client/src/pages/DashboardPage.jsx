import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { API_URLS, BUDGET_KEY } from '../constants';
import { UI_STYLES, COLORS } from '../constants/theme';

import MainLayout from '../components/layout/MainLayout';
import SubscriptionList from '../components/dashboard/SubscriptionList';
import Modal from '../components/ui/Modal';
import AddSubForm from '../components/dashboard/AddSubForm';

function DashboardPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Logic: Budget state initialized from LocalStorage
  const [budget, setBudget] = useState(() => 
    Number(localStorage.getItem(BUDGET_KEY)) || 5000
  );

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await axiosInstance.get(API_URLS.SUBS);
      setSubscriptions(response.data);
    } catch (err) {
      console.error("Failed to fetch", err);
    }
  };

  const handleSetBudget = () => {
    const val = prompt("Set your monthly budget limit (₹):", budget);
    if (val && !isNaN(val)) {
      const newBudget = Number(val);
      setBudget(newBudget);
      localStorage.setItem(BUDGET_KEY, newBudget);
    }
  };

  const filteredSubs = subscriptions.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className={UI_STYLES.heading}>Subscriptions</h1>
            <p className={`text-sm font-semibold text-${COLORS.text.muted}`}>
              Budget: 
              <button 
                onClick={handleSetBudget} 
                className={`ml-2 text-${COLORS.primary} hover:underline`}
              >
                ₹{budget.toLocaleString()} / month
              </button>
            </p>
          </div>
          
          <button onClick={() => setIsModalOpen(true)} className={UI_STYLES.buttonPrimary}>
            + Add Service
          </button>
        </div>

        {/* List Section */}
        <div className={UI_STYLES.card}>
          <input 
            type="text" 
            placeholder="Search your services..." 
            className={UI_STYLES.input}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="mt-8">
            <SubscriptionList 
              subscriptions={filteredSubs} 
              onDelete={(id) => setSubscriptions(prev => prev.filter(item => item._id !== id))} 
            />
          </div>
        </div>

        {/* Modal Logic */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="Add New Service"
        >
          <AddSubForm 
            onSave={(data) => {
              setSubscriptions([...subscriptions, data]);
              setIsModalOpen(false);
            }} 
          />
        </Modal>

      </div>
    </MainLayout>
  );
}

export default DashboardPage;