import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  Colors,
  ArcElement,
} from "chart.js";
import { useState } from "react";

ChartJS.register(Title, Tooltip, Legend, Colors, ArcElement);

export default function PieChart({ data: chartData }) {
  const dutyCounts = chartData.reduce((acc, current) => {
    const dutyLabel = current.duty;
    if (!acc[dutyLabel]) {
      acc[dutyLabel] = 0;
    }
    acc[dutyLabel] += 1;
    return acc;
  }, {});

  const [pieChartData, setPieChartData] = useState({
    labels: Object.keys(dutyCounts),
    datasets: [
      {
        data: Object.values(dutyCounts),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#C9CBCF",
        ], // Add more colors as needed
      },
    ],
  });

  const options = {
    plugins: {
      colors: {
        enabled: true,
      },
      title: {
        display: true,
        text: chartData[0].name,
        font: {
          size: 24,
        },
      },
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 16,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const duty = context.label;
            const count = context.raw;
            return `${duty}: ${count}`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "400px" }}>
      <Pie options={options} data={pieChartData} />
    </div>
  );
}
