import React, { useState, useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  scales,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const LipidChart = ({ lipidData }) => {
  if (!lipidData)
    return <p className="text-center text-gray-500">No data available</p>;

  const {
    totalCholesterol,
    hdl,
    ldl,
    triglycerides,
    vldl,
    cholesterolHdlRatio,
    ldlHdlRatio,
    date,
  } = lipidData;

  // Reference ranges
  const ranges = {
    totalCholesterol: { low: 125, high: 200 },
    hdl: { low: 40, high: 60 },
    ldl: { low: 50, high: 130 },
    triglycerides: { low: 35, high: 150 },
    vldl: { low: 5, high: 40 },
    cholesterolHdlRatio: { low: 2, high: 5 },
    ldlHdlRatio: { low: 1.5, high: 3.5 },
  };

  // Bar Chart Data
  const barData = {
    labels: [
      "Total Cholesterol",
      "HDL",
      "LDL",
      "Triglycerides",
      "VLDL",
      "Cholesterol/HDL Ratio",
      "LDL/HDL Ratio",
    ],
    datasets: [
      {
        label: "Lipid Levels",
        data: [
          totalCholesterol,
          hdl,
          ldl,
          triglycerides,
          vldl,
          cholesterolHdlRatio,
          ldlHdlRatio,
        ],
        backgroundColor: [
          "#4A90E2",
          "#50E3C2",
          "#F5A623",
          "#D0021B",
          "#9013FE",
          "#B8E986",
          "#FF8C00",
        ],
        borderRadius: 5,
      },
    ],
    scales: {
      x: {
        ticks: {
          color: "white", // X-axis label color
          // Rotate the labels to 90 degrees
          maxRotation: 90,
          minRotation: 90,
          // Additional option to prevent label overlap
          autoSkip: false,
        },
        grid: {
          color: "rgba(255,255,255,0.2)", // Light gridlines for dark mode
        },
      },
      y: {
        ticks: {
          color: "white", // Y-axis label color
        },
        grid: {
          color: "rgba(255,255,255,0.2)", // Light gridlines for dark mode
        },
      },
    },
  };

  // Doughnut Chart Data
  const doughnutData = {
    labels: ["HDL", "LDL", "VLDL"],
    datasets: [
      {
        data: [hdl, ldl, vldl],
        backgroundColor: ["#50E3C2", "#F5A623", "#9013FE"],
      },
    ],
  };

  return (
    <>
      <div
        className={`max-w-5xl w-full mx-auto p-6  shadow-lg rounded-2xl transition-colors duration-300 bg-gray-900 my-12 `}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Lipid Profile Analysis ({date})
          </h2>
        </div>

        {/* Charts Container */}
        <div className="flex flex-col md:flex-row gap-6 ">
          {/* Bar Chart */}
          <div className="w-full md:w-2/3 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            <Bar
              data={barData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
              }}
            />
          </div>

          {/* Doughnut Chart */}
          <div className="w-full md:w-1/3 flex justify-center items-center">
            <div className="w-72">
              <Doughnut data={doughnutData} options={{ responsive: true }} />
            </div>
          </div>
        </div>

        {/* Reference Ranges Table */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Reference Ranges</h3>
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 mt-2">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  Parameter
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  Your Value
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  Low
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  High
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(ranges).map((key, index) => {
                const value = lipidData[key];
                const low = ranges[key].low;
                const high = ranges[key].high;

                // Check if value is within the normal range
                const isNormal = value >= low && value <= high;
                const valueStatus = isNormal
                  ? "text-green-500"
                  : "text-red-500 font-semibold";

                return (
                  <tr key={index} className="text-center">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                      {key}
                    </td>
                    <td
                      className={`border border-gray-300 dark:border-gray-600 px-4 py-2 ${valueStatus}`}
                    >
                      {value}
                    </td>
                    <td
                      className={`border border-gray-300 dark:border-gray-600 px-4 py-2 ${valueStatus}`}
                    >
                      {low}
                    </td>
                    <td
                      className={`border border-gray-300 dark:border-gray-600 px-4 py-2 ${valueStatus}`}
                    >
                      {high}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default LipidChart;
