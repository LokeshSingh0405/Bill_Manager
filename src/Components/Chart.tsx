import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

interface Bill {
  description: string;
  category: string;
  amount: number;
  date: string;
  id: string;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type optionstype = {
  responsive: boolean;
  plugins: {
    legend: { position: "top" | "left" | "right" | "bottom" | "center" | "chartArea" |  undefined };
    title: { display: boolean; text: string };
  };
};

export const options:optionstype = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Your Monthly Billing Cycle",
    },
  },
};

const allmonthsArr = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Chart = () => {
  const bills = useSelector((state: any) => state.bills.bills);
  const amount = bills.map((bill: Bill) => bill.amount);

  const months = bills.map((bill: Bill) => bill.date.slice(5, 7));
  const labels = months.map((month: number) => allmonthsArr[Number(month - 1)]);

  const data = {
    labels,
    datasets: [
      {
        label: "Bills",
        data: amount,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
    ],
  };

  return (
    <div style={{ width: "50%" }}>
      <Line options={options} data={data} />
    </div>
  );
};

export default Chart;
