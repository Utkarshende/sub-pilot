import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register ChartJS elements
ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryChart({ subscriptions }) {
  // Logic: Group total cost by category
  const categoryTotals = subscriptions.reduce((acc, sub) => {
    const category = sub.category || 'Other';
    acc[category] = (acc[category] || 0) + parseFloat(sub.price);
    return acc;
  }, {});

  const labels = Object.keys(categoryTotals);
  const dataValues = Object.values(categoryTotals);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Total Spend (₹)',
        data: dataValues,
        backgroundColor: [
          '#3B82F6', // Blue (Entertainment)
          '#10B981', // Green (Utilities)
          '#F59E0B', // Amber (Work)
          '#EF4444', // Red (Fitness)
          '#8B5CF6', // Purple (Education)
          '#6B7280', // Gray (Other)
        ],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: { size: 12, weight: '500' }
        }
      },
    },
    cutout: '70%', // This makes it a clean "Ring" chart
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full">
      <div className="mb-4">
        <h3 className="text-gray-800 font-bold text-lg">Spending by Category</h3>
        <p className="text-sm text-gray-400">Distribution of your monthly costs</p>
      </div>
      
      <div className="h-64 relative">
        {dataValues.length > 0 ? (
          <Doughnut data={data} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 italic">
            No data available
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryChart;