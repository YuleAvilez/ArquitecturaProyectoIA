import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: "y",
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#ffffff",
      },
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      ticks: {
        stepSize: 5,
        color: "#ffffff",
      },
      grid: {
        color: "white",
      },
    },
    y: {
      ticks: {
        color: "#ffffff",
      },
      grid: {
        color: "white",
      },
    },
  },
};

export const UserBarChart = ({ userByGenders }) => {
  const data = {
    labels: ["Masculino", "Femenino"],
    datasets: [
      {
        label: "Usuarios por género",
        data: [userByGenders.masculino, userByGenders.femenino],
        backgroundColor: ["#8e44ad", "#a78bfa"],
        borderRadius: 8,
        barThickness: 30,
      },
    ],
  };

  return (
    <div className="w-full h-full dark:bg-purple-900 bg-purple-300 p-4 rounded-xl shadow-md">
      <Bar data={data} options={options} />
    </div>
  );
};
