import React from 'react'
import DataTable from '../components/DataTable'
import axios from 'axios';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import { fetchLipidData } from '../services/api';

const Mydata = () => {
    const [lipidData, setLipidData] = React.useState({
        totalCholesterol: [],
        hdl: [],
        ldl: [],
        triglycerides: [],
        vldl: [],
        cholesterolHdlRatio: [],
        ldlHdlRatio: [],
      });
    
      // Fetch lipid profile data from backend
      React.useEffect(() => {
        const getLipidData = async () => {
            const data = await fetchLipidData();
            if (data) setLipidData(data);
        }
        getLipidData();
      }, []);
    

  return (
    <>
    <Navbar/>
    <div className="p-4 my-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DataTable title="Total Cholesterol" data={lipidData.totalCholesterol} />
        <DataTable title="HDL" data={lipidData.hdl} />
        <DataTable title="LDL" data={lipidData.ldl} />
        <DataTable title="Triglycerides" data={lipidData.triglycerides} />
        <DataTable title="VLDL" data={lipidData.vldl} />
        <DataTable title="Cholesterol HDL Ratio" data={lipidData.cholesterolHdlRatio} />
        <DataTable title="LDL HDL Ratio" data={lipidData.ldlHdlRatio} />
      </div>
      <Footer/>
    </>
  )
}

export default Mydata