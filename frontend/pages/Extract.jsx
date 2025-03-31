import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { marked } from 'marked';
import Animai from '../components/Animai';
import { handleSubmit } from '../services/api';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LipidLineChart from '../components/Linechart';
import { 
  fetchLipidData, 
  uploadAndExtractFile, 
  addLipidData,
  restructureLipidData
} from '../services/lipidservice.js';

const Extract = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [showBalloon, setShowBalloon] = useState(false);
  const [output, setOutput] = useState("");
  
  const [lipidData, setLipidData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLipidData = async () => {
      try {
        const data = await fetchLipidData();
        setLipidData(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching lipid data.");
        setLoading(false);
      }
    };

    loadLipidData();
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

    // Show the loading animation before making the request
    setShowBalloon(true);
    setMessage("");

    try {
      // Upload and extract data
      const extractedData = await uploadAndExtractFile(file);
      setMessage(extractedData.text);
      
      // Store the extracted data
      await addLipidData(extractedData.text);
      
      // Refresh lipid data
      const updatedData = await fetchLipidData();
      setLipidData(updatedData);
      
      // Hide the animation after the request is completed
      setShowBalloon(false);

      // Show success toast
      toast.success("File uploaded successfully!", { autoClose: 1000, position: "bottom-right" });
    } catch (error) {
      setMessage(error.message || "Error uploading file.");
      setShowBalloon(false);
      console.error(error);
    }
  };

  const handleTrends = async () => {
    // Show the loading animation before making the request
    setShowBalloon(true);
    setMessage("");
    
    try {
      const data = await fetchLipidData();
      const historicalData = restructureLipidData(data);
      
      const analysisResult = await handleSubmit(historicalData);
      setOutput(analysisResult);
    } catch (error) {
      setMessage("Error analyzing trends.");
      console.error(error);
    } finally {
      setShowBalloon(false);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />

      <div className="container mx-auto mt-12 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center mt-2 space-y-4 sm:space-y-0 sm:space-x-4 w-full">
          <form onSubmit={handleSubmitFile} className="w-full sm:w-auto flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <input type="file" onChange={handleFileChange} className="file-input w-full sm:w-auto" />
            <button className="btn btn-soft btn-accent w-full sm:w-auto" type="submit">
              Upload
            </button>
          </form>

          <button className="btn btn-soft btn-accent w-full sm:w-auto" onClick={handleTrends}>
            Analyze trends
          </button>
        </div>
        
        {/* Show loading animation when uploading */}
        {showBalloon && (
          <div className="card bg-transparent w-full sm:w-96 mt-4" data-theme="autumn" data-aos="fade-up">
            <figure>
              <Animai />
            </figure>
          </div>
        )}

        <div className="flex flex-col items-center justify-center my-3 w-full">
          {output && output.map((item, index) => (
            <div
              key={index}
              data-theme="sunset"
              className="card shadow-xl py-6 px-6 w-full sm:w-4/5 lg:w-3/5 mb-6"
            >
              <h3 className="text-xl font-bold mb-4">{item.section}</h3>
              <p className="text-base" dangerouslySetInnerHTML={({__html:marked(item.content)})}></p>
            </div>
          ))}
        </div>
        
        {/* Show extracted message */}
        {message && (
          <div className="card bg-transparent w-full sm:w-3/4 mt-4" data-theme="sunset" data-aos="zoom-in">
            <div className="card-body">
              <h2 className="card-title">Extracted Data</h2>
              <div dangerouslySetInnerHTML={{ __html: marked(message) }}></div>
            </div>
          </div>
        )}

        <div className="container mx-auto sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {parameters.map((param) => (
              <LipidLineChart key={param} lipidData={lipidData} parameter={param} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Extract;