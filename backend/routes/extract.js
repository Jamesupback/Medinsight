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

        if (!fs.existsSync(req.file.path)) {
            return res.status(400).json({ message: "Uploaded file not found on the server" });
        }

        // Extract text from the uploaded PDF
        const text = await extractTextFromPDF(req.file.path);
        
        const message = { role: 'user', content: `
                Extract the lipid profile test values from the following medical report and return them in JSON format.

The JSON should follow this structure:
{
    "totalCholesterol": VALUE,
    "hdl": VALUE,
    "ldl": VALUE,
    "triglycerides": VALUE,
    "vldl": VALUE,
    "cholesterolHdlRatio": VALUE,
    "ldlHdlRatio": VALUE,
    "date": dd/mm//yyyy,
}

Ensure that the extracted values are placed in the correct fields. Return only the JSON output, without extra text.

Medical Report:

                ${text}`};
        const response = await ollama.chat({ model: 'llama3.2', messages: [message] })
        const result= response.message.content
        // Send extracted text as response
        console.log(result)
        res.status(200).json({ message: "File uploaded successfully", file: req.file, text: result });

        // Delete the file after processing
        fs.unlinkSync(req.file.path);
    } catch (err) {
        console.error("Error processing file:", err);
        res.status(500).json({ message: "File processing failed", error: err.message });
    }
});

export default router;
