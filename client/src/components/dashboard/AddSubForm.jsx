import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';

function AddSubForm({ initialData, onSave }) {
  const CATEGORIES = ['Entertainment', 'Utilities', 'Work', 'Health', 'Food', 'Other'];

  const [formData, setFormData] = useState({ 
    name: '', 
    amount: '', 
    category: 'Entertainment', // Default category
    paymentDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (initialData) {
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
      {/* Service Name */}
      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Service Name</label>
        <input 
          className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-500 font-bold"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="e.g. Spotify"
          required
        />
      </div>

      {/* CATEGORY SELECTOR BUTTONS */}
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Category</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFormData({ ...formData, category: cat })}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all border ${
                formData.category === cat 
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100' 
                : 'bg-white text-slate-400 border-slate-100 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
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
            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-500 font-bold"
            value={formData.paymentDate}
            onChange={(e) => setFormData({...formData, paymentDate: e.target.value})}
            required
          />
        </div>
      </div>

      <button type="submit" className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-indigo-100 mt-2 hover:bg-indigo-700 transition-all">
        {initialData ? 'Update Plan' : 'Save Subscription'}
      </button>
    </form>
  );
}

export default AddSubForm;