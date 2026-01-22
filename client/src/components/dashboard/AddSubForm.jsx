import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';

function AddSubForm({ initialData, onSave }) {
  const CATEGORIES = ['Entertainment', 'Utilities', 'Work', 'Health', 'Food', 'Other'];

  const [formData, setFormData] = useState({ 
    name: '', 
    amount: '', 
    category: 'Entertainment',
    paymentDate: '' 
  });

 useEffect(() => {
  if (initialData) {
    // Check if paymentDate exists, then chop off the time part
    // Converts "2026-01-22T12:34:56Z" -> "2026-01-22"
    const formattedDate = initialData.paymentDate 
      ? new Date(initialData.paymentDate).toISOString().split('T')[0] 
      : "";

    setFormData({
      name: initialData.name || '',
      amount: initialData.amount || '',
      category: initialData.category || 'Entertainment',
      paymentDate: formattedDate // THIS IS CRITICAL
    });
  }
}, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Logic: Determine if we should POST (new) or PUT (edit)
      if (initialData && initialData._id) {
        console.log("Updating Subscription ID:", initialData._id);
        
        // Ensure the URL matches your backend: /subscriptions/:id
        await axiosInstance.put(`/subscriptions/${initialData._id}`, formData);
      } else {
        console.log("Creating New Subscription");
        await axiosInstance.post('/subscriptions', formData);
      }
      
      onSave(); // Refresh dashboard and close modal
    } catch (err) {
      console.error("Save Operation Failed:", err.response?.data || err.message);
      alert("Failed to save. Check console for details.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-2">
      {/* ... (Your existing input fields for Name, Category, Price, Date) ... */}
      
      {/* Name Input */}
      <div>
        <label className="text-[10px] font-black uppercase text-slate-400">Plan Name</label>
        <input 
          className="w-full p-4 bg-slate-50 border rounded-2xl font-bold mt-1"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
      </div>

      {/* Category Toggle */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setFormData({...formData, category: cat})}
            className={`px-3 py-2 rounded-xl text-xs font-black border ${formData.category === cat ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Amount and Date */}
      <div className="grid grid-cols-2 gap-4">
        <input 
          type="number" 
          placeholder="Price"
          className="p-4 bg-slate-50 border rounded-2xl font-bold"
          value={formData.amount}
          onChange={(e) => setFormData({...formData, amount: e.target.value})}
          required
        />
        <input 
          type="date" 
          className="p-4 bg-slate-50 border rounded-2xl font-bold"
          value={formData.paymentDate}
          onChange={(e) => setFormData({...formData, paymentDate: e.target.value})}
          required
        />
      </div>

      <button 
        type="submit" 
        className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-700 transition-all"
      >
        {initialData ? 'Update Plan Now' : 'Save New Plan'}
      </button>
    </form>
  );
}

export default AddSubForm;