import express, { json } from "express";
import LipidProfile from "../models/lipidProfile.js"; 

const router = express.Router();

// Append new lipid values to the existing document
router.get("/", async (req, res) => {
    try {
        // Find the first document (or create if it doesn't exist)
        let lipidReport = await LipidProfile.findOne();

        if (!lipidReport) {
            lipidReport = new LipidProfile();
        }

        res.status(200).json(lipidReport);
    } catch (error) {
        res.status(500).json({ error:'neigh nigga' });
    }
}
);
router.post("/add", async (req, res) => {
    try {
        const data = JSON.parse(req.body.data);
        // Find the first document (or create if it doesn't exist)
        let lipidReport = await LipidProfile.findOne();

        if (!lipidReport) {
            lipidReport = new LipidProfile();
        }

        // Append new values to existing arrays
        lipidReport.totalCholesterol.push({ value: data.totalCholesterol, date: data.date });
        lipidReport.hdl.push({ value: data.hdl, date: data.date });
        lipidReport.ldl.push({ value: data.ldl, date: data.date });
        lipidReport.triglycerides.push({ value: data.triglycerides, date: data.date });
        lipidReport.vldl.push({ value: data.vldl, date: data.date });
        lipidReport.cholesterolHdlRatio.push({ value: data.cholesterolHdlRatio, date: data.date });
        lipidReport.ldlHdlRatio.push({ value: data.ldlHdlRatio, date: data.date });

        // Save updated document
        await lipidReport.save();
        res.status(201).json({ message: "Lipid Profile updated successfully!" });

    } catch (error) {
        console.error("Error saving lipid profile:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
