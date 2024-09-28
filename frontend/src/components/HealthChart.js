import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const HealthChart = () => {
  const data = {
    labels: ['Mar 11', 'Mar 12', 'Mar 13', 'Mar 14', 'Mar 15', 'Mar 16', 'Mar 17'],
    datasets: [
      {
        label: 'Hemoglobin',
        data: [6.5, 6.8, 7.0, 6.9, 6.7, 6.6, 6.8],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
    ],
  };

  return (
    <div className="health-chart">
      <h3>Diagnostic Analytics</h3>
      <Line data={data} />
    </div>
  );
};

export default HealthChart;
