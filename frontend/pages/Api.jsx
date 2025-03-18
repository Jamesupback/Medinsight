import React, { useState } from 'react';
import axios from 'axios';
import { handleSubmit } from '../services/api';
import {marked} from 'marked';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Animai from '../components/Animai';
import { SignedIn } from '@clerk/clerk-react';
const Api = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [dataloaded, setDataloaded] = useState(false);
    // const handleSend = async () => {
    //   setOutput(''); // Clear previous output
  
    //   // Send the input data to the backend using axios
    //   await axios.post('http://localhost:5000/api/stream', { data: input });
  
    //   // Start the SSE stream
    //   const eventSource = new EventSource('http://localhost:5000/api/stream');
  
    //   eventSource.onmessage = (event) => {
    //     if (event.data === '[DONE]') {
    //       eventSource.close(); // Close the connection when done
    //       return;
    //     }
        
    //     setOutput((prev) => prev +event.data); // Append new chunks
    //   };
  
    //   eventSource.onerror = () => {
    //     console.error('Error with SSE connection');
    //     eventSource.close();
    //   };
    // };
  
    return (
      <>
        <SignedIn>
        <Navbar fixed={false} />
        <div className='flex items-center justify-center mt-12'>
          <input
            className="border-2 border-gray-300 w-1/3 p-3 rounded mx-5"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter data..."
            required
          />
          <button className="btn btn-primary w-28"
            onClick={async(e) => {setOutput('');setOutput((await handleSubmit(input)))}}
          >Send</button>

          </div>
          <div className="flex flex-col items-center justify-center my-12 min-h-full w-full">
            {output ? output.map((item, index) => (
              <div
                key={index}
                data-theme="cupcake"
                className="card bg-base-100 shadow-xl py-6 px-6 w-1/2 mb-6"
              >
                <h3 className="text-xl font-bold mb-4">{item.section}</h3>
                <p className="text-base" dangerouslySetInnerHTML={({__html:marked(item.content)})}></p>
              </div>
            )):(
              <div className="card bg-transparent  w-96  mt-5" data-theme="sunset" data-aos='zoom-in'>
                        <figure>
                            <Animai/>
                        </figure>
                        
                    </div>
            )}
          </div>

          <Footer />
        </SignedIn>
      </>
    );
  };
export default Api;