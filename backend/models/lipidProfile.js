import mongoose from "mongoose";

const lipidProfileSchema = new mongoose.Schema({
    totalCholesterol: { type: [{ value: Number, date: String }], default: [] },
    hdl: { type: [{ value: Number, date: String }], default: [] },
    ldl: { type: [{ value: Number, date: String }], default: [] },
    triglycerides: { type: [{ value: Number, date: String }], default: [] },
    vldl: { type: [{ value: Number, date: String }], default: [] },
    cholesterolHdlRatio: { type: [{ value: Number, date: String }], default: [] },
    ldlHdlRatio: { type: [{ value: Number, date: String }], default: [] }
});

const LipidProfile = mongoose.model("LipidProfile", lipidProfileSchema);
export default LipidProfile;
