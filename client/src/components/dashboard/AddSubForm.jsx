import React, { useState } from 'react';
import Button from '../ui/Button';
import { CATEGORIES, BTN_VARIANTS, UI_STRINGS } from '../../constants';

function AddSubForm({ onSave, onCancel }) {
  // LOGIC: Local state for the form fields
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: CATEGORIES[0].value, // Default to first category
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // LOGIC: Validation before sending
    if (!formData.name || !formData.amount) return alert("Please fill all fields");
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-semibold text-gray-600">Service Name</label>
        <input 
          type="text" 
          placeholder="e.g., Netflix"
          className="w-full p-2 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-600">Monthly Amount (₹)</label>
        <input 
          type="number" 
          placeholder="0.00"
          className="w-full p-2 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.amount}
          onChange={(e) => setFormData({...formData, amount: e.target.value})}
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-600">Category</label>
        <select 
          className="w-full p-2 mt-1 border rounded-lg outline-none bg-white"
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
        >
          {CATEGORIES.map(cat => (
            <option key={cat.id} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-3 pt-4">
        <Button variant={BTN_VARIANTS.GHOST} className="flex-1" onClick={onCancel}>
          {UI_STRINGS.CANCEL}
        </Button>
        <Button type="submit" variant={BTN_VARIANTS.PRIMARY} className="flex-1">
          {UI_STRINGS.SAVE}
        </Button>
      </div>
    </form>
  );
}

export default AddSubForm;