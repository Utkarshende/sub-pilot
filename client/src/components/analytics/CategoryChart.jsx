import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { CHART_COLORS } from '../../constants'; // Logic: Import centralized colors

ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryChart({ subscriptions = [] }) {
  const categoryTotals = subscriptions.reduce((acc, sub) => {
    const category = sub.category || 'Other';
    // Logic: Use .amount (as per your backend) and handle numbers safely
    acc[category] = (acc[category] || 0) + Number(sub.amount || 0);
    return acc;
  }, {});

  const labels = Object.keys(categoryTotals);
  const dataValues = Object.values(categoryTotals);

  const data = {
    labels: labels,
    datasets: [{
      data: dataValues,
      backgroundColor: CHART_COLORS,
      borderWidth: 0, // Logic: Remove borders for a cleaner look
      hoverOffset: 20,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { usePointStyle: true, padding: 30 } },
    },
    cutout: '75%', // Thinner ring for more premium feel
  };

  return (
    <div className="h-full w-full flex flex-col">
      {dataValues.length > 0 ? (
        <Doughnut data={data} options={options} />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400 italic">No data</div>
      )}
    </div>
  );
}

export default CategoryChart;