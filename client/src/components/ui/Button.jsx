import React from 'react';

// LOGIC: Functional Component using 'rfce' pattern
function Button({ children, onClick, variant, type = "button", className = "" }) {
  return (
    <button 
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-all ${variant} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;