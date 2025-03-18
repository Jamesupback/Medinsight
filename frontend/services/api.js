import axios from "axios";
const handleSubmit = async (data) => {
    console.log(data)
    try {
        const response = await axios.post("http://localhost:5000/api/nonstream", { data});
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
        // Additional lines
        console.log(summary);
        console.log(riskAssessment);
        console.log(predictiveAnalysis);
        console.log(lifestyleSuggestions);
        console.log(comparativeAnalysis);
        console.log(recommendation);
        const resultArray = [
            { section: "Summary", content: '**'+summary },
            { section: "Risk Assessment", content: riskAssessment },
            { section: "Predictive Analysis", content: predictiveAnalysis },
            { section: "Lifestyle Suggestions", content: lifestyleSuggestions },
            { section: "Comparative Analysis", content: comparativeAnalysis },
            { section: "Recommendation", content: recommendation }
        ];
        return resultArray;
        return response.data.response; // Ensure this matches your API response structure
    } catch (error) {
        console.error("Error during API call:", error);
    }
};

const handleChat= async (data) => {
    try {
        const response = await axios.post("http://192.168.1.38:5000/api/chat", { data });
        console.log(response.data.response); // Log the response
        return response.data.response; // Ensure this matches your API response structure
    } catch (error) {
        console.error("Error during API call:", error);
    }
};
  
  export { handleSubmit,handleChat };
  