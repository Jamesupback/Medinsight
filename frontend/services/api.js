import axios from "axios";
const ip='localhost'
const handleSubmit = async (data) => {
    console.log(data)
    try {
        const response = await axios.post(`http://${ip}:5000/api/nonstream`, { data});
        const responseData = response.data.response;
        const summary = responseData.substring(
            responseData.indexOf("Summary") + "Summary".length,
            responseData.indexOf("Risk Assessment")-2
        ).trim();
        const riskAssessment = responseData.substring(
            responseData.indexOf("Risk Assessment") + "Risk Assessment".length + 2,
            responseData.indexOf("Predictive Analytics")-2
        ).trim();
        const predictiveAnalysis = responseData.substring(
            responseData.indexOf("Predictive Analytics") + "Predictive Analytics".length+2,
            responseData.indexOf("Lifestyle Suggestions")-2
        ).trim();
        const lifestyleSuggestions = responseData.substring(
            responseData.indexOf("Lifestyle Suggestions") + "Lifestyle Suggestions".length+2,
            responseData.indexOf("Comparative Analysis")-2
        ).trim();
        const comparativeAnalysis = responseData.substring(
            responseData.indexOf("Comparative Analysis") + "Comparative Analysis".length+2,
            responseData.indexOf("Recommendations")-2
        ).trim();
        const recommendation = responseData.substring(
            responseData.indexOf("Recommendations") + "Recommendations".length+2
        ).trim();
        const resultArray = [
            { section: "Summary", content: '**'+summary },
            { section: "Risk Assessment", content: riskAssessment },
            { section: "Predictive Analysis", content: predictiveAnalysis },
            { section: "Lifestyle Suggestions", content: lifestyleSuggestions },
            { section: "Comparative Analysis", content: comparativeAnalysis },
            { section: "Recommendation", content: recommendation }
        ];
        return resultArray;
    } catch (error) {
        console.error("Error during API call:", error);
    }
};

const handleChatReq= async (data) => {
    try {
        const response = await axios.post(`http://${ip}:5000/api/chat`, { data });
        return response.data.response; // Ensure this matches your API response structure
    } catch (error) {
        console.error("Error during API call:", error);
    }
};

const uploadFile = async (formData) => {
  try {
    const response = await axios.post(`http://${ip}:5000/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      text: response.data.text,
      json: JSON.parse(response.data.json),
      error: null,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    return { text: "Error uploading file.", json: null, error };
  }
};

    // Function to fetch lipid profile data from backend
    const fetchLipidData = async () => {
        try {
          const response = await axios.get(`http://${ip}:5000/lipid`);
            return response.data;
        } catch (error) {
          console.error("Error fetching lipid profile data:", error);
        }
      };


export { handleSubmit, uploadFile, fetchLipidData, handleChatReq };

  