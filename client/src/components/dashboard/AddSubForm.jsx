import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';

function AddSubForm({ initialData, onSave }) {
  const [formData, setFormData] = useState({ 
    name: '', 
    amount: '', 
    category: 'Entertainment',
    paymentDate: new Date().toISOString().split('T')[0] // Default to today
  });

  useEffect(() => {
    if (initialData) {
      // Ensure the date is formatted correctly for the input
      const formattedDate = initialData.paymentDate 
        ? new Date(initialData.paymentDate).toISOString().split('T')[0] 
        : '';
      setFormData({ ...initialData, paymentDate: formattedDate });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialData?._id) {
        await axiosInstance.put(`/subscriptions/${initialData._id}`, formData);
      } else {
        await axiosInstance.post('/subscriptions', formData);
      }
      onSave();
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-2">
      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Service Name</label>
        <input 
          className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-500 font-bold text-slate-800"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="e.g. Netflix, Gym, AWS"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Monthly Price</label>
          <input 
            type="number"
            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-500 font-bold"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Billing Date</label>
          <input 
            type="date"
            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-500 font-bold text-slate-600"
            value={formData.paymentDate}
            onChange={(e) => setFormData({...formData, paymentDate: e.target.value})}
            required
          />
        </div>
      </div>

      <button type="submit" className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-indigo-100 mt-4 hover:bg-indigo-700 transition-all">
        {initialData ? 'Update Details' : 'Save Subscription'}
      </button>
    </form>
  );
}

export default AddSubForm;