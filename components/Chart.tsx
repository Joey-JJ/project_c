//making a chart component to show the ev charging station usage
// generating random data for the chart
// charting voltage during day 
// with the help of chart.js

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
    const data = {
        labels: [
        '00:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00',
        ],
        datasets: [
        {
            label: 'Voltage',
            data: [65, 59, 80, 81, 56, 55, 40, 44, 32, 34, 65, 53, 21, 45, 0, 0, 0 ,21, 34, 24, 12, 56, 32, 75],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
        },
        ],
    };
    
    const options = {
        scales: {
        y: {
            beginAtZero: true,
        },
        },
    };
    
    return <Line data={data} options={options} />;
    };

export default Chart;









