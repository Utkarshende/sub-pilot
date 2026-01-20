import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const SubscriptionForm = ({ onAdd }) => {
    // 1. STATE: This is the "temporary memory" of the form.
    // It keeps track of what the user is typing before they hit 'Submit'.
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        category: 'Entertainment'
    });

    // 2. LOGIC: The HandleSubmit function
    const handleSubmit = (e) => {
        console.log("The type of formData is:", typeof formData); 
console.log("The type of setFormData is:", typeof setFormData);
        // Prevents the browser from refreshing the page
        e.preventDefault();

        // Basic Validation: Don't allow empty submissions
        if (!formData.name || !formData.amount) {
            alert("Please fill in all required fields");
            return;
        }

        // Pass the data to the Parent (App.jsx)
        onAdd(formData);

        // Reset the form so the user can add another one
        setFormData({ name: '', amount: '', category: 'Entertainment' });
    };
   


    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-4 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add Subscription</h2>

            {/* Service Name Input */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Service Name</label>
                <input
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="e.g. Netflix, Spotify"
                    value={formData.name}
                    // Updating only the 'name' property while keeping the rest
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
            </div>

            <div className="flex gap-4">
                {/* Monthly Amount Input */}
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Monthly Cost (₹)</label>
                    <input
                        type="number"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="0.00"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    />
                </div>

                {/* Category Dropdown */}
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
                className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
                <PlusCircle size={18} /> Add Subscription
            </button>
        </form>
    );
};

export default SubscriptionForm;