import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';

function AddSubForm({ initialData, onSave }) {
  const [formData, setFormData] = useState({ name: '', amount: '', category: 'Entertainment' });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialData?._id) {
        // Logic: EDIT existing
        await axiosInstance.put(`/subscriptions/${initialData._id}`, formData);
      } else {
        // Logic: ADD new
        await axiosInstance.post('/subscriptions', formData);
      }
      onSave(); // Trigger the fetchSubs in Dashboard
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-2">
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase text-slate-400">Plan Name</label>
        <input 
          className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:border-indigo-500 font-bold"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase text-slate-400">Monthly Price (₹)</label>
        <input 
          type="number"
          className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:border-indigo-500 font-bold"
          value={formData.amount}
          onChange={(e) => setFormData({...formData, amount: e.target.value})}
          required
        />
      </div>
      <button type="submit" className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-indigo-100">
        {initialData ? 'Update Plan' : 'Confirm Subscription'}
      </button>
    </form>
  );
}

export default AddSubForm;