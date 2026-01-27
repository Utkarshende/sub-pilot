import React from 'react';

// Reusable Button
export const Button = ({ children, onClick, variant = 'primary', type = 'button' }) => {
  const styles = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-300 text-gray-600 hover:bg-gray-50"
  };

  return (
    <button 
      type={type}
      onClick={onClick}
      className={`${styles[variant]} px-6 py-2 rounded-lg font-bold transition duration-200 disabled:opacity-50`}
    >
      {children}
    </button>
  );
};

// Reusable Input
export const Input = ({ placeholder, value, onChange, type = "text" }) => (
  <input 
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full border-gray-200 border p-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition"
  />
);