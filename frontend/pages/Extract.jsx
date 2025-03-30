import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { marked } from 'marked';
import Animai from '../components/Animai';
import DataTable from '../components/DataTable';
import { handleSubmit } from '../services/api';
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
  }, [lipidData]);

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


  const handleTrends = ()=>{
    // Show the loading animation before making the request
    setShowBalloon(true);
    setMessage("");
    axios.get("http://localhost:5000/lipid")
      .then(async(lipidData) => {
        const historicalData = {
          totalCholesterol: lipidData.data.totalCholesterol.map(item => ({
              value: item.value,
              date: item.date
          })),
          hdl: lipidData.data.hdl.map(item => ({
              value: item.value,
              date: item.date
          })),
          ldl: lipidData.data.ldl.map(item => ({
              value: item.value,
              date: item.date
          })),
          triglycerides: lipidData.data.triglycerides.map(item => ({
              value: item.value,
              date: item.date
          })),
          vldl: lipidData.data.vldl.map(item => ({
              value: item.value,
              date: item.date
          })),
          cholesterolHdlRatio: lipidData.data.cholesterolHdlRatio.map(item => ({
              value: item.value,
              date: item.date
          })),
          ldlHdlRatio: lipidData.data.ldlHdlRatio.map(item => ({
              value: item.value,
              date: item.date
          }))
        }

        setOutput(await handleSubmit(historicalData));
        setShowBalloon(false);
      });

  }
  return (
    <>
      <Navbar />
      <ToastContainer />

      <div className="container mx-auto my-12 justify-center items-center flex flex-col">
        <div className='flex items-center justify-center mt-2'>
        <form onSubmit={handleSubmitFile} className="m-10">
          <input type="file" onChange={handleFileChange} className="file-input" />
          <button className="btn btn-soft btn-accent" type="submit">
            Upload
          </button>
        </form>

        <button className="btn btn-soft btn-accent" onClick={handleTrends}>
            Analyze trends
          </button>
        </div>
        
        {/* Show loading animation when uploading */}
        {showBalloon && (
          <div className="card bg-transparent w-96 mt-2" data-theme="sunset" data-aos="zoom-in">
            <figure>
              <Animai />
            </figure>
          </div>
        )}

        <div className="flex flex-col items-center justify-center my-6 min-h-full w-full">
                    {output && output.map((item, index) => (
                      <div
                        key={index}
                        data-theme="cupcake"
                        className="card bg-base-100 shadow-xl py-6 px-6 w-1/2 mb-6"
                      >
                        <h3 className="text-xl font-bold mb-4">{item.section}</h3>
                        <p className="text-base" dangerouslySetInnerHTML={({__html:marked(item.content)})}></p>
                      </div>
                    ))
                    }
        </div>
        {/* Show extracted message */}
        {message && (
          <div className="card bg-transparent w-3/4 " data-theme="sunset" data-aos="zoom-in">
            <div className="card-body">
              <h2 className="card-title">Extracted Data</h2>
              <div dangerouslySetInnerHTML={{ __html: marked(message) }}></div>
            </div>
          </div>
        )}
      </div>

      {/* <h2 className="text-2xl font-bold text-center mb-4">Lipid Profile Data</h2> */}
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
