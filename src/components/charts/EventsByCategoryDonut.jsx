import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function EventsByCategoryDonut({ events }) {
  const categoryCounts = events.reduce((acc, ev) => {
    const cat = ev.category || "Sense categoria";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(categoryCounts);
  const values = Object.values(categoryCounts);

  const data = {
    labels,
    datasets: [
      {
        label: "Esdeveniments per categoria",
        data: values,
        backgroundColor: [
          "#4F46E5",
          "#EC4899",
          "#10B981",
          "#F59E0B",
          "#3B82F6",
          "#EF4444",
          "#8B5CF6",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="max-w-md mx-auto">
      <Doughnut data={data} options={options} />
    </div>
  );
}
