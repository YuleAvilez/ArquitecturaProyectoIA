import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Careers } from "../../../../../data/DataDashboard";

ChartJS.register(ArcElement, Tooltip, Legend);

export const CareerPieChart = () => {
  const backgroundColors = [
    "#9b59b6",
    "#8e44ad",
    "#d291bc",
    "#c39bd3",
    "#a569bd",
  ];

  const pieData = {
    labels: Careers.map((c) => c.name),
    datasets: [
      {
        label: "Carreras recomendadas",
        data: Careers.map((c) => c.total),
        backgroundColor: backgroundColors,
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#4B0082",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full h-full max-h-[450px] flex flex-col justify-center">
      <h2 className="text-xl font-semibold text-purple-700 text-center mb-4">
        Carreras recomendadas
      </h2>
      <div className="w-full h-full max-h-[400px] flex items-center justify-center">
        <Pie data={pieData} options={options} />
      </div>
    </div>
  );
};
