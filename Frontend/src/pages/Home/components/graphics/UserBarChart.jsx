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
import { users } from "../../../../data/DataDashboard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["Masculino", "Femenino"],
  datasets: [
    {
      label: "Usuarios por género",
      data: [users.masculino, users.femenino],
      backgroundColor: ["#8e44ad", "#a78bfa"],
      borderRadius: 8,
      barThickness: 30,
    },
  ],
};

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

export const UserBarChart = () => {
  return (
    <div className="w-full h-[290px] bg-purple-300 p-4 rounded-xl shadow-md">
      <Bar data={data} options={options} />
    </div>
  );
};
