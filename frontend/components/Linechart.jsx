import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Reference Ranges
const ranges = {
  totalCholesterol: { low: 125, high: 200 },
  hdl: { low: 40, high: 60 },
  ldl: { low: 50, high: 130 },
  triglycerides: { low: 35, high: 150 },
  vldl: { low: 5, high: 40 },
  cholesterolHdlRatio: { low: 2, high: 5 },
  ldlHdlRatio: { low: 1.5, high: 3.5 },
};

// Function to perform Linear Regression
const linearRegression = (x, y) => {
  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.map((xi, i) => xi * y[i]).reduce((a, b) => a + b, 0);
  const sumX2 = x.map((xi) => xi * xi).reduce((a, b) => a + b, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return (nextX) => slope * nextX + intercept;
};

const LipidLineChart = ({ lipidData, parameter }) => {
  if (!lipidData || !lipidData[parameter]) return <p>Loading chart...</p>;

  // Extract Dates and Values
  const dates = lipidData[parameter].map((item) => item.date);
  const values = lipidData[parameter].map((item) => item.value);
  const low = ranges[parameter]?.low;
  const high = ranges[parameter]?.high;

  // Convert Dates to Numeric Index (0,1,2,3,...)
  const xValues = dates.map((_, index) => index);
  const predict = linearRegression(xValues, values);
  const nextX = xValues.length; // Next index
  const predictedValue = predict(nextX);

  // Add Prediction to Data
  const extendedDates = [...dates, "Next"];
  const extendedValues = [...values, predictedValue];

  // Define Chart Data
  const chartData = {
    labels: extendedDates,
    datasets: [
      {
        label: parameter,
        data: extendedValues,
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: extendedValues.map((val, i) =>
          i === extendedValues.length - 1 ? "blue" : val < low || val > high ? "red" : "green"
        ),
      },
      {
        label: "Low Threshold",
        data: new Array(extendedDates.length).fill(low),
        borderColor: "yellow",
        borderWidth: 1.5,
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: "High Threshold",
        data: new Array(extendedDates.length).fill(high),
        borderColor: "red",
        borderWidth: 1.5,
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: "Predicted Trend",
        data: [...values, predictedValue],
        borderColor: "blue",
        borderWidth: 2,
        borderDash: [10, 5],
        pointRadius: 5,
        pointBackgroundColor: "blue",
      },
    ],
  };

  // Define Chart Options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "white" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      y: {
        ticks: { color: "white" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
  };

  return (
    <div className="w-full h-96  bg-gray-900 px-10 pt-10 pb-16  m-3 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-white text-center">{parameter}</h3>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LipidLineChart;
