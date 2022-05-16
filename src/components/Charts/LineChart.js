import React, { useState, useEffect } from 'react'
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


const LineChart = props => {
  const {
    transactionType,
  } = props
  const [chart, setChart] = useState({})
  var baseUrl = `https://localhost:5000/api/transactionsPerMonth/${transactionType}`;


  useEffect(() => {
    const fetchTransactions = async () => {
      await fetch(`${baseUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              setChart(data)
            });
          }
        }).catch((error) => {
          console.log(error);
        });
    };
    fetchTransactions()
  }, [baseUrl])

  var data = {
    labels: chart?.transactions?.map(x => x.month),
    datasets: [{
      label: `${transactionType} MDL`,
      data: chart?.transactions?.map(x => x.sum),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }

  return (
    <div>
      <Line
        data={data}
        height={400}
        options={options}

      />
    </div>
  )
}

export default LineChart