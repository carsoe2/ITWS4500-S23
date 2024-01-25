import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Bar } from 'react-chartjs-2';
import { defaults, Chart } from 'chart.js'

defaults.font.size = 30;
Chart.defaults.color = "black";

const SurfaceTemp = () => {
  const { stateID } = useParams();
  const [ records, setRecords ] = useState([]);

  let chartData;
  let labels_map = {};
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  useEffect(() => {
    fetch('https://carsoe2.eastus.cloudapp.azure.com/node/api/surfaceTemp/' + stateID)
    .then(response => response.json())
    .then(res => {
      setRecords(res);
    })
    .catch(err => {
      const message = `An error occurred: ${err}`;
      window.alert(message);
    });
  }, [stateID]);
  

  if (records.length > 0) {
    for (let i = 0; i < months.length; i++) {
      labels_map[months[i]] = records[i];
    }
  
    chartData = {
      labels: Object.keys(labels_map),
      datasets: [
        {
          label: 'Average Surface Temperature',
          data: Object.values(labels_map),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'black',
          borderWidth: 1,
          
        },
      ],
    };
  }

  return (
    <div>
      <h2>Average Surface Temperature Per Month</h2>
      {chartData && 
        <Bar data={chartData} />
      }
    </div>
  );
}

export default SurfaceTemp;