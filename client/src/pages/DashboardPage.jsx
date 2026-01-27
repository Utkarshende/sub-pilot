import React, { useEffect, useState, useContext } from 'react';
import API from '../api/axiosInstance';
import { AuthContext } from '../context/AuthContext';

const DashboardPage = () => {
  const { logout } = useContext(AuthContext);
  const [subs, setSubs] = useState([]);
  const [form, setForm] = useState({ name: '', amount: '', category: 'Entertainment' });

  const fetchSubs = async () => {
    try {
      const { data } = await API.get('/subscriptions');
      setSubs(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchSubs(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!form.name || !form.amount) return alert("Fill all fields");
    await API.post('/subscriptions', form);
    setForm({ name: '', amount: '', category: 'Entertainment' });
    fetchSubs();
  };

  const total = subs.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">SubTracker</h1>
          <button onClick={logout} className="text-red-500 font-medium">Logout</button>
        </div>

        {/* Total Spend Card */}
        <div className="bg-indigo-600 rounded-2xl p-8 text-white shadow-lg mb-8">
          <p className="opacity-80 text-sm uppercase tracking-wider">Total Monthly Budget</p>
          <h2 className="text-5xl font-extrabold mt-2">${total.toFixed(2)}</h2>
        </div>

        {/* Add Subscription Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm flex flex-wrap gap-4 mb-10">
          <input className="flex-1 border-gray-200 border p-3 rounded-lg outline-none focus:border-indigo-500" placeholder="Service Name (e.g. Netflix)" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
          <input className="w-32 border-gray-200 border p-3 rounded-lg outline-none focus:border-indigo-500" type="number" placeholder="Price" value={form.amount} onChange={(e) => setForm({...form, amount: e.target.value})} />
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 transition">Add</button>
        </form>

        {/* List of Subscriptions */}
        <div className="grid gap-4">
          {subs.map(sub => (
            <div key={sub._id} className="bg-white p-5 rounded-xl shadow-sm flex justify-between items-center border border-gray-100">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{sub.name}</h3>
                <p className="text-gray-400 text-xs uppercase">{sub.category}</p>
              </div>
              <p className="text-xl font-bold text-gray-900">${sub.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;