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
import { useSelector } from 'react-redux';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Your Monthly Billing Cycle',
      },
    },
  };
  
  const allmonthsArr = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const Chart = () => {
    const bills = useSelector((state) => state.bills.bills)
    const amount = bills.map((bill) => bill.amount) 

    const months = bills.map((bill) => bill.date.slice(5,7)) 
    const labels = (months.map((month) => allmonthsArr[Number(month-1)]))
  
    const data = {
        labels,
        datasets: [
          {
            label: 'Bills',
            data: amount,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            yAxisID: 'y',
          }
        ],
      };


    return (
      <Line options={options} data={data} />      
    )
}

export default Chart