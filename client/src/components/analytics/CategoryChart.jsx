import React, { useMemo } from 'react'; // Logic: useMemo ensures chart updates correctly
import { Doughnut } from 'react-chartjs-2';
import { CHART_COLORS } from '../../constants';

function CategoryChart({ subscriptions = [] }) {
  // Logic: Recalculate whenever subscriptions change
  const chartData = useMemo(() => {
    const categoryTotals = subscriptions.reduce((acc, sub) => {
      const cat = sub.category || 'Other';
      acc[cat] = (acc[cat] || 0) + Number(sub.amount || 0); // Logic: Fixed field name to 'amount'
      return acc;
    }, {});

    return {
      labels: Object.keys(categoryTotals),
      datasets: [{
        data: Object.values(categoryTotals),
        backgroundColor: CHART_COLORS,
        borderWidth: 0,
        hoverOffset: 10,
      }],
    };
  }, [subscriptions]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right', labels: { boxWidth: 12, padding: 20 } },
    },
    cutout: '70%',
  };

  return (
    <div className="h-64 w-full max-w-md mx-auto"> {/* Logic: Standard fixed size */}
      <Doughnut data={chartData} options={options} />
    </div>
  );
}

export default CategoryChart;