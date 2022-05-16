import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



const PieChart = props => {
  const {
    transactionType,
    month
  } = props

  const [chart, setChart] = useState({})
  let baseUrl = `https://localhost:5000/api/transactionsPerCategory/${transactionType}/${month}`;

  useEffect(() => {
    const fetchCoins = async () => {
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
        });
    };
    fetchCoins()
  }, [baseUrl])

  var data = {
    labels: chart?.transactions?.map(x => x.category),
    datasets: [{
      label: `${chart?.transactions?.length} MDL`,
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
      {chart?.transactions?.length > 0 &&
        <Pie
          data={data}
          height={400}
          options={options}
        />
      }
    </div>
  )
}

export default PieChart