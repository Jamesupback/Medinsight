import React, { useEffect } from "react";
import herodna from '/assets/herodna.jpg';
import Animviz from "./Animviz";
import Animinsight from "./Animinsight";
import Animocr from "./Animocr";
import Animintro from "./Animintro";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the styles

const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 2500 }); // Customize the animation duration
  }, []);

  return (
    <>
      
      <div
        className="hero bg-base-200 min-h-screen "
        style={{
          backgroundImage: `url(${herodna})`,
          backgroundBlendMode: 'soft-light',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-3xl  md:text-5xl text-blue-50 font-bold" data-aos="fade-up">
              Your Medical Reports, Simplified
            </h1>
            <p className="py-6 text-lg sm:text-base" data-aos="zoom-in-up" data-aos-anchor-placement="top-bottom">
              MedInsight is a medical records analyzer that uses secure storage, OCR for digitizing lab results, and data analysis to provide health insights, trends, and risk predictions, empowering better decision-making.
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section 2 */}
      <div className="hero bg-base-200" data-theme="sunset">
        <div className="hero-content flex-col lg:flex-row" data-aos="fade-right">
          <Animviz />
          <div className="text-center lg:text-left mt-6 lg:mt-0" data-aos="zoom-in-up">
            <h1 className="text-3xl md:text-5xl font-bold">Visualize your medical reports.</h1>
            <p className="py-4 lg:pr-48">
              MedInsight uses intuitive data visualizations to transform complex lab results into clear, actionable health insights.
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section 3 */}
      <div className="hero bg-base-200" data-theme="sunset">
        <div className="hero-content flex-col-reverse lg:flex-row" data-aos="fade-left">
          <div className="text-center lg:text-left lg:w-1/2 lg:pl-24" data-aos="zoom-in-up">
            <h1 className="text-3xl md:text-5xl font-bold">Get valuable insights from your data</h1>
            <p className="py-4">
              MedInsight generates actionable insights by analyzing lab results and uncovering meaningful health patterns and trends.
            </p>
          </div>
          <div className="lg:w-1/2 lg:flex lg:justify-end mt-6 lg:mt-0">
            <Animinsight />
          </div>
        </div>
      </div>

      {/* Hero Section 4 */}
      <div className="hero bg-base-200" data-theme="sunset">
        <div className="hero-content flex-col lg:flex-row" data-aos="fade-right">
          <Animocr />
          <div className="text-center lg:text-left mt-6 lg:mt-0" data-aos="zoom-in-up">
            <h1 className="text-3xl md:text-5xl font-bold">Integrated OCR technology</h1>
            <p className="py-4 lg:pr-48">
              MedInsight leverages OCR technology to seamlessly digitize lab test results, converting physical records into accessible and analyzable digital data.
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section 5 */}
      <div className="hero bg-base-200" data-theme="sunset">
        <div className="hero-content flex-col-reverse lg:flex-row" data-aos="fade-left">
          <div className="text-center lg:text-left lg:w-1/2 lg:pl-24" data-aos="zoom-in-up">
            <h1 className="text-3xl md:text-5xl font-bold">Understand your data better</h1>
            <p className="py-4">
              MedInsight generates actionable insights by analyzing lab results and uncovering meaningful health patterns and trends.
            </p>
          </div>
          <div className="lg:w-1/2 lg:flex lg:justify-end mt-6 lg:mt-0">
            <Animintro />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;