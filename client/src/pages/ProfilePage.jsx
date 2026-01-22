import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import MainLayout from '../components/layout/MainLayout';
import Navbar from '../components/layout/Navbar';
import { User, Mail, Phone, MapPin, Calendar, Users, Lock, LogOut, Save, Edit2 } from 'lucide-react';

function ProfilePage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);
  const [user, setUser] = useState({
    name: '', email: '', phone: '', address: '', dob: '', gender: ''
  });
  const [passwords, setPasswords] = useState({ old: '', new: '' });

  // Fetch user data on load
  useEffect(() => {
    const fetchUser = async () => {a
      try {
        const res = await axiosInstance.get('/users/profile');
        setUser(res.data);
      } catch (err) { console.error("Error fetching profile", err); }
    };
    fetchUser();
  }, []);

  const handleUpdate = async () => {
    try {
      await axiosInstance.put('/users/profile', user);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) { alert("Update failed"); }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put('/users/change-password', passwords);
      setShowPassModal(false);
      alert("Password changed!");
    } catch (err) { alert(err.response?.data?.message || "Error"); }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/auth');
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white border border-slate-100 rounded-[3rem] shadow-sm overflow-hidden">
          
          {/* Header */}
          <div className="bg-slate-900 p-12 text-white flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-indigo-500 flex items-center justify-center text-4xl font-medium italic">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-medium">{user.name}</h1>
                <p className="text-indigo-300 text-sm">{user.email}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 bg-rose-500/10 text-rose-400 px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-rose-500 hover:text-white transition">
              <LogOut size={16} /> Logout
            </button>
          </div>

          <div className="p-10 grid md:grid-cols-3 gap-12">
            {/* Sidebar / Actions */}
            <div className="space-y-4">
              <button 
                onClick={() => isEditing ? handleUpdate() : setIsEditing(true)}
                className={`w-full py-4 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition ${isEditing ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {isEditing ? <><Save size={16}/> Save Changes</> : <><Edit2 size={16}/> Edit Profile</>}
              </button>
              <button 
                onClick={() => setShowPassModal(true)}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-indigo-700 transition flex items-center justify-center gap-2"
              >
                <Lock size={16} /> Change Password
              </button>
            </div>

            {/* Main Info Fields */}
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
              {[
                { label: 'Full Name', key: 'name', icon: <User size={18}/>, type: 'text' },
                { label: 'Email Address', key: 'email', icon: <Mail size={18}/>, type: 'email', disabled: true },
                { label: 'Phone Number', key: 'phone', icon: <Phone size={18}/>, type: 'text' },
                { label: 'Date of Birth', key: 'dob', icon: <Calendar size={18}/>, type: 'date' },
                { label: 'Address', key: 'address', icon: <MapPin size={18}/>, type: 'text' },
              ].map((field) => (
                <div key={field.key} className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 flex items-center gap-2">
                    {field.icon} {field.label}
                  </label>
                  <input 
                    type={field.type}
                    disabled={field.disabled || !isEditing}
                    value={user[field.key] || ''}
                    onChange={(e) => setUser({...user, [field.key]: e.target.value})}
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-indigo-500 outline-none transition disabled:opacity-60"
                  />
                </div>
              ))}
              
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 flex items-center gap-2">
                  <Users size={18}/> Gender
                </label>
                <select 
                  disabled={!isEditing}
                  value={user.gender}
                  onChange={(e) => setUser({...user, gender: e.target.value})}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-indigo-500 outline-none transition"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPassModal && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-medium mb-6 italic tracking-tight">Update Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <input 
                type="password" placeholder="Current Password" required
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none"
                onChange={(e) => setPasswords({...passwords, old: e.target.value})}
              />
              <input 
                type="password" placeholder="New Password" required
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none"
                onChange={(e) => setPasswords({...passwords, new: e.target.value})}
              />
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowPassModal(false)} className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl font-bold uppercase text-[10px]">Cancel</button>
                <button type="submit" className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold uppercase text-[10px] shadow-lg shadow-indigo-100">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default ProfilePage;