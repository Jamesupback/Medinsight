import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { marked } from 'marked';
import Animai from '../components/Animai';
import DataTable from '../components/DataTable';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Extract = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [showBalloon, setShowBalloon] = useState(false);
  const [output, setOutput] = useState("");

  const [lipidData, setLipidData] = useState({
    totalCholesterol: [],
    hdl: [],
    ldl: [],
    triglycerides: [],
    vldl: [],
    cholesterolHdlRatio: [],
    ldlHdlRatio: [],
  });

  // Fetch lipid profile data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/lipid");
        setLipidData(response.data);
      } catch (error) {
        console.error("Error fetching lipid profile data:", error);
      }
    };
    fetchData();
  }, []);

  // Handle file change event
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  const handleSubmitFile = async (e) => {
    e.preventDefault();
    setOutput("");
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    // Show the loading animation before making the request
    setShowBalloon(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/extract", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(response.data.text);

      // Send the extracted data to the backend to be stored
      await axios.post("http://localhost:5000/lipid/add", { data: response.data.text }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Hide the animation after the request is completed
      setShowBalloon(false);

      // Show success toast
    toast.success("File uploaded successfully!", { autoClose: 1000, position: "bottom-right" });

      // Refresh lipid data
      fetchLipidData();
    } catch (error) {
      setMessage("Error uploading file.");
      setShowBalloon(false);
      console.error(error);
    }
  };

  // Function to fetch lipid data again after upload
  const fetchLipidData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/lipid");
      setLipidData(response.data);
    } catch (error) {
      console.error("Error fetching lipid profile data:", error);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />

      <div className="container mx-auto my-12 justify-center items-center flex flex-col">
        <form onSubmit={handleSubmitFile} className="m-10">
          <input type="file" onChange={handleFileChange} className="file-input" />
          <button className="btn btn-soft btn-accent" type="submit">
            Upload
          </button>
        </form>

        {/* Show loading animation when uploading */}
        {showBalloon && (
          <div className="card bg-transparent w-96 mt-5" data-theme="sunset" data-aos="zoom-in">
            <figure>
              <Animai />
            </figure>
          </div>
        )}

        {/* Show extracted message */}
        {message && (
          <div className="card bg-transparent w-96 mt-5" data-theme="sunset" data-aos="zoom-in">
            <div className="card-body">
              <h2 className="card-title">Extracted Data</h2>
              <div dangerouslySetInnerHTML={{ __html: marked(message) }}></div>
            </div>
          </div>
        )}
      </div>

      <h2 className="text-2xl font-bold text-center mb-4">Lipid Profile Data</h2>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DataTable title="Total Cholesterol" data={lipidData.totalCholesterol} />
        <DataTable title="HDL" data={lipidData.hdl} />
        <DataTable title="LDL" data={lipidData.ldl} />
        <DataTable title="Triglycerides" data={lipidData.triglycerides} />
        <DataTable title="VLDL" data={lipidData.vldl} />
        <DataTable title="Cholesterol HDL Ratio" data={lipidData.cholesterolHdlRatio} />
        <DataTable title="LDL HDL Ratio" data={lipidData.ldlHdlRatio} />
      </div>

      <Footer />
    </>
  );
};

export default Extract;
