import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { marked } from 'marked';
import Animai from '../components/Animai';
import LipidChart from '../components/LipidChart';
import { uploadFile } from '../services/api';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [showBalloon, setShowBalloon] = useState(false);
  const [ldata, setLdata] = useState({});
  const [isLoading, setIsLoading] = useState(false);  // New loading state

  // Handle file change event
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    // Set loading state and show balloon
    setIsLoading(true);
    setShowBalloon(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await uploadFile(formData);  // Call the upload function
      setMessage(response.text);
      setShowBalloon(false);
      setLdata(response.json);  // Set the received data
      toast.success("File uploaded successfully!", { autoClose: 1000, position: "bottom-right" });
    } catch (error) {
      setMessage('An error occurred while uploading the file.');
      console.error(error);
    } finally {
      setIsLoading(false);  // Hide loading after data is received or error occurs
    }
  };

  const splitIntoBlocks = (message) => {
    const regex = /\*\*(.*?)\*\*[\s\S]*?(?=\*\*|$)/g;
    const blocks = [];
    let match;
    
    while ((match = regex.exec(message)) !== null) {
      blocks.push(match[0]);
    }
    
    return blocks;
  };
  return (
    <>
      <Navbar />    
      <ToastContainer />
      <div className="container mx-auto my-12 justify-center items-center flex flex-col">
        <form onSubmit={handleSubmit} className='m-10 flex'>
          <input type="file" onChange={handleFileChange} className="file-input" />
          <button className="btn btn-soft btn-accent" type='submit'>Upload</button>
        </form>
        
        {/* Show LipidChart only when data is available */}
        {ldata && Object.keys(ldata).length > 0 && !isLoading && <LipidChart lipidData={ldata} />}
        
        {/* Show message if available */}
        {message && <p data-theme="sunset" className="card bg-base-100 shadow-xl py-6 px-6 w-3/4 mb-6" dangerouslySetInnerHTML={{ __html: marked(message) }}></p>}
        
        {/* Show Animai component as a loading animation */}
        {isLoading && (
          <div className="card bg-transparent w-96 mt-2" data-theme="autumn" data-aos="zoom-in">
            <figure>
              <Animai />
            </figure>
          </div>
        )}
      </div>
      
      <div className='mt-96'>
        <Footer />
      </div>
    </>
  );
};

export default FileUpload;
