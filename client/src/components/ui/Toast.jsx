import React, { useEffect } from 'react';

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer); // LOGIC: Cleanup to prevent memory leaks
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600';

  return (
    <div className={`fixed bottom-6 right-6 ${bgColor} text-white px-6 py-3 rounded-xl shadow-lg z-[150] animate-in slide-in-from-bottom`}>
      <p className="font-medium">{message}</p>
    </div>
  );
}

export default Toast;