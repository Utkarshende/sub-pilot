import React, { useState, useEffect } from 'react';
import { PlusCircle, Save } from 'lucide-react';

// 1. FIXED: Added editingSub and onUpdate to the props
const SubscriptionForm = ({ onAdd, editingSub, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        category: 'Entertainment'
    });

    // 2. EFFECT: This watches for when the "Edit" button is clicked in App.jsx
    useEffect(() => {
        if (editingSub) {
            setFormData({
                name: editingSub.name,
                amount: editingSub.amount,
                category: editingSub.category
            });
        }
    }, [editingSub]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.amount) {
            alert("Please fill in all required fields");
            return;
        }

        // 3. FIXED: The "Switch" logic
        if (editingSub) {
            // If we are in edit mode, use the ID we got from the parent
            onUpdate(editingSub._id, formData);
        } else {
            // Otherwise, just add a new one
            onAdd(formData);
        }

        // Reset the form
        setFormData({ name: '', amount: '', category: 'Entertainment' });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-4 border border-gray-100">
            {/* 4. FIXED: Dynamic Title */}
            <h2 className="text-xl font-bold text-gray-800 mb-4">
                {editingSub ? "Edit Subscription" : "Add New Subscription"}
            </h2>

            <div>
                <label className="block text-sm font-medium text-gray-700">Service Name</label>
                <input
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="e.g. Netflix"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
            </div>

            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Monthly Cost (₹)</label>
                    <input
                        type="number"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    />
                </div>

                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                        <option value="Entertainment">Entertainment</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Work">Work</option>
                        <option value="Food">Food</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>

            <button
                type="submit"
                className={`w-full py-3 rounded-md font-semibold text-white transition-colors flex items-center justify-center gap-2 ${
                    editingSub ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
                {/* 5. FIXED: Dynamic Icon and Text */}
                {editingSub ? <Save size={18} /> : <PlusCircle size={18} />}
                {editingSub ? "Save Changes" : "Add Subscription"}
            </button>
        </form>
    );
};

export default SubscriptionForm;