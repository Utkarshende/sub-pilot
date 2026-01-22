import React, { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// Logic: Use a specific color array for distinct categories
const CATEGORY_COLORS = {
  Entertainment: '#6366F1', // Indigo
  Utilities: '#10B981',      // Emerald
  Work: '#F59E0B',           // Amber
  Food: '#EF4444',           // Rose
  Health: '#EC4899',         // Pink
  Other: '#94A3B8'           // Slate
};

function CategoryChart({ subscriptions = [] }) {
  const chartData = useMemo(() => {
    const totals = subscriptions.reduce((acc, sub) => {
      const cat = sub.category || 'Other';
      acc[cat] = (acc[cat] || 0) + Number(sub.amount || 0);
      return acc;
    }, {});

    const labels = Object.keys(totals);
    return {
      labels,
      datasets: [{
        data: Object.values(totals),
        backgroundColor: labels.map(label => CATEGORY_COLORS[label] || CATEGORY_COLORS.Other),
        hoverOffset: 15,
        borderWidth: 0,
      }],
    };
  }, [subscriptions]);

  const options = {
    cutout: '75%',
    plugins: {
      legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20 } }
    },
    maintainAspectRatio: false
  };

  return (
    <div className="h-64 relative">
      <Doughnut data={chartData} options={options} />
    </div>
  );
}

export default CategoryChart;