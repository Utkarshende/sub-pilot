import React, { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { CHART_COLORS } from '../../constants';

// CRITICAL FIX: Explicitly register the "arc" element for Doughnut charts
ChartJS.register(ArcElement, Tooltip, Legend, Colors);

function CategoryChart({ subscriptions = [] }) {
  const chartData = useMemo(() => {
    const categoryTotals = subscriptions.reduce((acc, sub) => {
      const cat = sub.category || 'Other';
      acc[cat] = (acc[cat] || 0) + Number(sub.amount || 0);
      return acc;
    }, {});

    return {
      labels: Object.keys(categoryTotals),
      datasets: [{
        data: Object.values(categoryTotals),
        backgroundColor: CHART_COLORS,
        borderWidth: 0,
        hoverOffset: 12,
      }],
    };
  }, [subscriptions]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'bottom', 
        labels: { usePointStyle: true, padding: 20, font: { size: 11, weight: 'bold' } } 
      },
    },
    cutout: '75%',
  };

  return (
    <div className="h-64 w-full flex items-center justify-center">
      {chartData.datasets[0].data.length > 0 ? (
        <Doughnut data={chartData} options={options} />
      ) : (
        <p className="text-gray-400 italic text-sm">No data to display</p>
      )}
    </div>
  );
}

export default CategoryChart;