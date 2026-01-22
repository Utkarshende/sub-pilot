import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; // Logic: Required registration
import { Doughnut } from 'react-chartjs-2';
import { CHART_PALETTE } from '../../constants/theme';
import  { useMemo } from 'react'; // ADDED 'useMemo' here

ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryChart({ subscriptions = [] }) {
  const chartData = useMemo(() => {
    const totals = subscriptions.reduce((acc, sub) => {
      acc[sub.category] = (acc[sub.category] || 0) + Number(sub.amount);
      return acc;
    }, {});

    return {
      labels: Object.keys(totals),
      datasets: [{
        data: Object.values(totals),
        backgroundColor: CHART_PALETTE,
        hoverOffset: 10,
        borderWidth: 4,
        borderColor: '#ffffff',
      }],
    };
  }, [subscriptions]);

  const options = {
    cutout: '80%',
    plugins: {
      legend: { 
        position: 'right', 
        labels: { boxWidth: 8, usePointStyle: true, font: { weight: 'bold', size: 10 } } 
      }
    },
    maintainAspectRatio: false
  };

  return <Doughnut data={chartData} options={options} />;
}

export default CategoryChart;