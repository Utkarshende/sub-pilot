import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Navbar from '../components/layout/Navbar';
import { Camera, LogOut, ShieldCheck, User as UserIcon } from 'lucide-react';

function ProfilePage() {
  const navigate = useNavigate();
  // Logic: Pull user data from localStorage (or your Context)
  const [user, setUser] = useState({
    name: localStorage.getItem('user_name') || 'SubPilot User',
    email: localStorage.getItem('user_email') || 'user@example.com',
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate('/auth');
  };

  // Logic: Get the first letter of the name for the avatar
  const getInitial = () => user.name.charAt(0).toUpperCase();

  return (
    <MainLayout>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white border border-slate-100 rounded-[3rem] shadow-sm overflow-hidden">
          
          {/* Header/Cover Area */}
          <div className="h-32 bg-slate-900 w-full"></div>

          <div className="px-10 pb-10">
            {/* Profile Avatar Section */}
            <div className="relative -mt-16 mb-6 flex justify-between items-end">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white bg-indigo-50 flex items-center justify-center text-4xl font-medium text-indigo-600 italic shadow-sm">
                  {getInitial()}
                </div>
                <button className="absolute bottom-1 right-1 bg-indigo-600 p-2 rounded-full text-white border-2 border-white hover:bg-indigo-700 transition">
                  <Camera size={16} />
                </button>
              </div>
              
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-3 border border-rose-100 text-rose-500 rounded-2xl font-semibold text-xs uppercase tracking-widest hover:bg-rose-50 transition"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>

            {/* User Info */}
            <div className="mb-10">
              <h1 className="text-3xl font-medium text-slate-900 tracking-tight">{user.name}</h1>
              <p className="text-slate-400 font-medium">{user.email}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Account Details Form */}
              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 border-b pb-2">Account Details</h3>
                
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 block mb-1 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-medium outline-none focus:border-indigo-500 transition"
                    value={user.name}
                    readOnly
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 block mb-1 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-medium outline-none focus:border-indigo-500 transition"
                    value={user.email}
                    readOnly
                  />
                </div>
              </div>

              {/* Security/Stats Section */}
              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 border-b pb-2">Security & Status</h3>
                
                <div className="p-6 bg-indigo-50 rounded-[2rem] flex items-center gap-4">
                  <div className="p-3 bg-white rounded-2xl text-indigo-600 shadow-sm">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-indigo-900 uppercase tracking-tighter">Verified Member</p>
                    <p className="text-[10px] text-indigo-400 font-medium">Your account is secured with JWT</p>
                  </div>
                </div>

                <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-semibold text-xs uppercase tracking-widest hover:bg-slate-800 transition">
                  Change Password
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default ProfilePage;