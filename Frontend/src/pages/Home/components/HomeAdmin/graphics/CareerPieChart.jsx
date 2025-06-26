import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const CareerPieChart = ({ countByCareer }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    handleThemeChange();
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const maxLabels = 5;
  const backgroundColors = [
    "#9b59b6",
    "#8e44ad",
    "#d291bc",
    "#c39bd3",
    "#a569bd",
    "#b79ced",
  ];

  const sortedCareers = [...countByCareer].sort((a, b) => b.count - a.count);
  const topCareerNames = sortedCareers.slice(0, maxLabels).map((c) => c.careerName);

  const groupedData = countByCareer.reduce((acc, item) => {
    const label = topCareerNames.includes(item.careerName) ? item.careerName : "Otros";
    acc[label] = (acc[label] || 0) + item.count;
    return acc;
  }, {});

  const finalLabels = Object.keys(groupedData);
  const finalData = Object.values(groupedData);

  const pieData = {
    labels: finalLabels,
    datasets: [
      {
        label: "Carreras recomendadas",
        data: finalData,
        backgroundColor: backgroundColors.slice(0, finalLabels.length),
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
          color: isDark ? "#ffffff" : "#4B0082",
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
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 w-full h-full flex flex-col justify-center">
      <h2 className="text-xl dark:text-white font-semibold text-purple-700 text-center mb-4">
        Carreras recomendadas
      </h2>
      <div className="w-full h-full max-h-[400px] flex items-center justify-center">
        <Pie data={pieData} options={options} />
      </div>
    </div>
  );
};
