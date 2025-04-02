// src/services/lipidService.js
import axios from 'axios';

const ip = 'http://localhost:5000'; // Replace with your desired IP or make it configurable

// Fetch all lipid data
export const fetchLipidData = async () => {
    try {
        const response = await axios.get(`${ip}/lipid`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching lipid data');
    }
};

// Upload and extract data from file
export const uploadAndExtractFile = async (file) => {
    if (!file) {
        throw new Error('Please select a file to upload');
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post(`${ip}/extract`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error uploading file');
    }
};

// Add lipid data to database
export const addLipidData = async (data) => {
    try {
        const response = await axios.post(`${ip}/lipid/add`, { data }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error saving lipid data');
    }
};

// Restructure lipid data for analysis
export const restructureLipidData = (data) => {
    return {
        totalCholesterol: data.totalCholesterol.map(item => ({
            value: item.value,
            date: item.date
        })),
        hdl: data.hdl.map(item => ({
            value: item.value,
            date: item.date
        })),
        ldl: data.ldl.map(item => ({
            value: item.value,
            date: item.date
        })),
        triglycerides: data.triglycerides.map(item => ({
            value: item.value,
            date: item.date
        })),
        vldl: data.vldl.map(item => ({
            value: item.value,
            date: item.date
        })),
        cholesterolHdlRatio: data.cholesterolHdlRatio.map(item => ({
            value: item.value,
            date: item.date
        })),
        ldlHdlRatio: data.ldlHdlRatio.map(item => ({
            value: item.value,
            date: item.date
        }))
    };
};
