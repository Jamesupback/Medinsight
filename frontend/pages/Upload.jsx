import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { marked } from 'marked';
import Animai from '../components/Animai';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

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

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.text);
    } catch (error) {
      setMessage('Error uploading file.');
      console.error(error);
    }
  };

  return (
    <>
        <Navbar/>    
            <div className="container mx-auto my-12 justify-center items-center flex flex-col">
            <form onSubmit={handleSubmit} className='m-10'>
             <input type="file" onChange={handleFileChange} className="file-input" />
             <button className="btn btn-soft btn-accent" type='submit'>upload</button>
            </form>
            {message ?<p data-theme="cupcake" className="card bg-base-100 shadow-xl py-6 px-6 w-3/4 mb-6" dangerouslySetInnerHTML={({__html:marked(message)})}></p> :(
              <div className="card bg-transparent  w-96  mt-5" data-theme="sunset" data-aos='zoom-in'>
                        <figure>
                            <Animai/>
                        </figure>
                        
              </div>
            )}
            </div>
        <Footer/>
    </>
  );
};

export default FileUpload;
