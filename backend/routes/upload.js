import express from 'express';
import fs from 'fs';
import upload from '../middlewares/upload.js';
import extractTextFromPDF from '../utils/pdfextractor.js';
import ollama from 'ollama';

const router = express.Router();

// File upload route
router.post("/", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        console.log("Uploaded file path:", req.file.path);

        if (!fs.existsSync(req.file.path)) {
            return res.status(400).json({ message: "Uploaded file not found on the server" });
        }

        // Extract text from the uploaded PDF
        const text = await extractTextFromPDF(req.file.path);
        
        const message = { role: 'user', content: `You are a medical report analyzer. Your goal is to extract relevant test values from the provided text and explain their meaning in a way that a non-medical person can easily understand.
                Instructions:
                1.Extract only the observed values of each test from the provided medical report text. Ignore reference ranges.
                3.Avoid introductory or context setting messages.
                4.Do not include any notes or additional information.
                5.Present the results in a structured format using bold subheadings for test names and clear explanations.

            Output format:
                Test Name (Bold Subheading) \n\n
                Observed Value: <extracted_value with unit> \n
                Explanation: <easy-to-understand explanation> \n
                Abnormalities:<what high and low values indicate?> \n
                Health Insights: <what current values indicate whether it is high or low or normal> \n
                Recommendations <if applicable>: <general lifestyle recommendations to improve abnormal values.>\n\n
                ${text}`};
        const response = await ollama.chat({ model: 'llama3.2', messages: [message] })
        const result= response.message.content
        console.log(response)
        // Send extracted text as response
        res.status(200).json({ message: "File uploaded successfully", file: req.file, text: result });

        // Delete the file after processing
        fs.unlinkSync(req.file.path);
    } catch (err) {
        console.error("Error processing file:", err);
        res.status(500).json({ message: "File processing failed", error: err.message });
    }
});

export default router;
