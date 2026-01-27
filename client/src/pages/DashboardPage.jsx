import React, { useEffect, useState } from 'react';
import API from '../api/axiosInstance';

const DashboardPage = () => {
  const [subs, setSubs] = useState([]);
  const [form, setForm] = useState({ name: '', amount: '', category: 'Entertainment' });

  const fetchSubs = async () => {
    const { data } = await API.get('/subscriptions');
    setSubs(data);
  };

  useEffect(() => { fetchSubs(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/subscriptions', form);
    setForm({ name: '', amount: '', category: 'Entertainment' });
    fetchSubs();
  };

  const deleteSub = async (id) => {
    await API.delete(`/subscriptions/${id}`);
    fetchSubs();
  };

  const total = subs.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6">Subscription Tracker</h1>
      
      {/* Stat Card */}
      <div className="bg-blue-600 text-white p-6 rounded-lg mb-8">
        <p className="text-lg">Total Monthly Spending</p>
        <h2 className="text-4xl font-bold">${total.toFixed(2)}</h2>
      </div>

      {/* Add Form */}
      <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
        <input className="border p-2 rounded w-full" placeholder="Name (Netflix)" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
        <input className="border p-2 rounded w-full" type="number" placeholder="Amount" value={form.amount} onChange={(e) => setForm({...form, amount: e.target.value})} />
        <button className="bg-black text-white px-6 py-2 rounded">Add</button>
      </form>

      {/* List */}
      <div className="space-y-4">
        {subs.map(sub => (
          <div key={sub._id} className="flex justify-between items-center border-b pb-4">
            <div>
              <p className="font-bold text-lg">{sub.name}</p>
              <p className="text-gray-500 text-sm">{sub.category}</p>
            </div>
            <div className="flex items-center gap-6">
              <span className="font-semibold text-xl">${sub.amount}</span>
              <button onClick={() => deleteSub(sub._id)} className="text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;