import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const ScoreChart = ({ overallScore }) => {
  // Calculate the remaining percentage for the center text
  const remainingPercentage = 100 - overallScore;

  // Data for the pie chart
  const data = {
    datasets: [
      {
        data: [overallScore, remainingPercentage],
        backgroundColor: ['green', 'lightgray'],
        borderWidth: 0,
      },
    ],
  };

  // Options for the pie chart
  const options = {
    cutoutPercentage: 75, // Adjust the cutout percentage to create a doughnut chart
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
  };

  return (
    <div>
      <Doughnut data={data} options={options} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'green' }}>{overallScore}%</div>
        <div style={{ fontSize: '12px', color: 'gray' }}>Overall Score</div>
      </div>
    </div>
  );
};

export default ScoreChart;
