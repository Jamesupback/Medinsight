import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { marked } from "marked";
import avatar from "/assets/avatar.png";
import jamie from "/assets/jamie.jpg";
import { BeakerIcon } from "@heroicons/react/24/solid";
import donwload from "/assets/download.gif";
import Animai from "../components/Animai";
import { useEffect } from "react";
import AOS from "aos";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import Animalogerror from "../components/Animalogerror";
import Erroralert from "../components/Erroralert";
import Greentoast from "../components/Greentoast";
import AuthToast from "../components/Authtoast";
import { handleChatReq } from "../services/api";

const Chat = () => {
  const user = useUser();
  const [input, setInput] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, [user]);

  const handleChat = async (data) => {
    setInput("");
    setResponses((prev) => [...prev, { isLoading: false, input: data }]);
    setIsloading(true);

    try {
      const response = await handleChatReq(data);
      const newOutput = marked(response); // Ensure this matches your API response structure

      // Add the new response to the list
      setResponses((prev) => [
        ...prev,
        { isLoading: false, output: newOutput },
      ]);
    } catch (error) {
      console.error("Error during API call:", error);
    } finally {
      setIsloading(false);
    }
  };

  const responsesEndRef = React.useRef(null);

  React.useEffect(() => {
    if (responsesEndRef.current) {
      responsesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [responses, isloading]);

  return (
    <>
      {/* <Greentoast message={"Successfully logged in! 🎉"} /> */}
      <SignedIn>
        <>
          <Navbar fixed={true} />
          <div className="flex flex-col items-center  ">
            {responses.length == 0 && (
              <>
                <div
                  className="card bg-base-100 h-3/4 w-5/6 sm:w-1/4 shadow-xl mt-56"
                  data-theme="sunset"
                  data-aos="zoom-in"
                >
                  <figure>
                    <Animai />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title  text-center">
                      Greetings..how may i help you
                    </h2>
                  </div>
                </div>
              </>
            )}
            <div className="cardslist flex flex-col items-center w-full mt-24 flex-grow z-0">
              {responses.map((res, index) => (
                <div
                  key={index}
                  className="w-full flex flex-col items-center px-4"
                >
                  {res.output && (
                    <div
                      className={`chat chat-start max-w-[100%] w-full sm:w-3/4 md:w-1/2 mb-8 bg-inherit`}
                      style={
                        index === responses.length - 1
                          ? { marginBottom: "80px" }
                          : {}
                      }
                    >
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <img alt="AI Avatar" src={avatar} />
                        </div>
                      </div>
                      <div
                        className="chat-bubble"
                        dangerouslySetInnerHTML={{ __html: res.output }}
                      ></div>
                    </div>
                  )}
                  {res.input && (
                    <div className="chat chat-end  sm:ml-0 w-full  sm:w-3/4 md:w-1/2 mb-8 bg-inherit">
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <img alt="User Avatar" src={jamie} />
                        </div>
                      </div>
                      <div className="chat-bubble">{res.input}</div>
                    </div>
                  )}
                </div>
              ))}

              {isloading && (
                <div className="chat chat-start w-1/2  mb-24 bg-inherit">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src={avatar}
                      />
                    </div>
                  </div>
                  <div className="chat-bubble">
                    <span className="loading loading-infinity loading-lg"></span>
                  </div>
                </div>
              )}
              <div ref={responsesEndRef} />
            </div>

            <div className="container flex justify-center items-center px-4 sm:px-0 fixed bottom-0 w-full py-4">
              <input
                type="text"
                value={input}
                placeholder="Type here"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleChat(input);
                  }
                }}
                className="input  input-primary w-full max-w-lg mb-"
              />
              <button
                className="btn btn-primary mx-2 sm:mx-4"
                onClick={async () => await handleChat(input)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </>
      </SignedIn>
    </>
  );
};

export default Chat;
