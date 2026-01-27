import React, { useEffect, useState, useContext } from 'react';
import API from '../api/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import { Button, Input } from '../components/UIElements.jsx';

const DashboardPage = () => {
  const { logout } = useContext(AuthContext);
  const [subs, setSubs] = useState([]);
  const [filter, setFilter] = useState('All');
  const [form, setForm] = useState({ name: '', amount: '', category: 'Entertainment' });

  const fetchSubs = async () => {
    const { data } = await API.get('/subscriptions');
    setSubs(data);
  };

  useEffect(() => { fetchSubs(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Current User Info:", localStorage.getItem('userInfo')); // DEBUG LINE
    await API.post('/subscriptions', form);
    setForm({ name: '', amount: '', category: 'Entertainment' });
    fetchSubs();
  };



  const deleteSub = async (id) => {
    await API.delete(`/subscriptions/${id}`);
    fetchSubs();
  };

  const filteredSubs = filter === 'All' ? subs : subs.filter(s => s.category === filter);
  const total = filteredSubs.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black text-indigo-900 tracking-tight">SubTrack.</h1>
          <Button variant="outline" onClick={logout}>Logout</Button>
        </header>

        {/* Total Card */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-3xl text-white shadow-xl mb-10">
          <span className="text-indigo-100 text-sm font-semibold uppercase tracking-widest">Current Burn Rate</span>
          <h2 className="text-5xl font-black mt-2">${total.toFixed(2)}</h2>
        </div>

        {/* Filter Bar */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {['All', 'Entertainment', 'Bills', 'Work'].map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition ${filter === cat ? 'bg-black text-white' : 'bg-white text-gray-500 border'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Form Component */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row gap-4 mb-10">
          <Input placeholder="Service Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
          <Input type="number" placeholder="Price" value={form.amount} onChange={(e) => setForm({...form, amount: e.target.value})} />
          <Button type="submit">Add Sub</Button>
        </form>

        {/* Results */}
        <div className="grid gap-4">
          {filteredSubs.map(sub => (
            <div key={sub._id} className="bg-white p-6 rounded-2xl flex justify-between items-center hover:shadow-md transition border border-gray-100">
              <div>
                <h4 className="font-bold text-gray-800">{sub.name}</h4>
                <p className="text-xs text-gray-400 font-bold uppercase">{sub.category}</p>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-xl font-black text-gray-900">${sub.amount}</span>
                <button onClick={() => deleteSub(sub._id)} className="text-red-400 hover:text-red-600 font-bold">✕</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;