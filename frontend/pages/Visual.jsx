import React, { useState, useEffect } from "react";
import axios from "axios";
import LipidLineChart from "../components/Linechart";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Visual = () => {
  const [lipidData, setLipidData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/lipid");
        setLipidData(response.data); // Store API response
        setLoading(false);
      } catch (err) {
        setError("Error fetching lipid data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const parameters = [
    "totalCholesterol",
    "hdl",
    "ldl",
    "triglycerides",
    "vldl",
    "cholesterolHdlRatio",
    "ldlHdlRatio",
  ];

  if (loading) return <p className="text-white">Loading lipid data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
        <Navbar/>
        <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {parameters.map((param) => (
          <LipidLineChart key={param} lipidData={lipidData} parameter={param} />
        ))}
      </div>
    </div>
    <Footer/>
    </>

  );
};

export default Visual;
