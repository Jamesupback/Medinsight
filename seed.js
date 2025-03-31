import mongoose from "mongoose";
import LipidProfile from "./backend/models/lipidProfile.js";

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/medinsight';
mongoose.connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB Connection Error:", err));

    const seedData = {
        totalCholesterol: [
            { value: 150, date: "2024-05" }, { value: 155, date: "2024-06" },
            { value: 160, date: "2024-07" }, { value: 165, date: "2024-08" },
            { value: 170, date: "2024-09" }, { value: 175, date: "2024-10" },
            { value: 180, date: "2024-11" }, { value: 185, date: "2024-12" },
            { value: 190, date: "2025-01" }, { value: 195, date: "2025-02" }
        ],
        hdl: [
            { value: 45, date: "2024-05" }, { value: 46, date: "2024-06" },
            { value: 47, date: "2024-07" }, { value: 48, date: "2024-08" },
            { value: 49, date: "2024-09" }, { value: 50, date: "2024-10" },
            { value: 51, date: "2024-11" }, { value: 52, date: "2024-12" },
            { value: 53, date: "2025-01" }, { value: 54, date: "2025-02" }
        ],
        ldl: [
            { value: 80, date: "2024-05" }, { value: 85, date: "2024-06" },
            { value: 90, date: "2024-07" }, { value: 95, date: "2024-08" },
            { value: 100, date: "2024-09" }, { value: 105, date: "2024-10" },
            { value: 110, date: "2024-11" }, { value: 115, date: "2024-12" },
            { value: 120, date: "2025-01" }, { value: 125, date: "2025-02" }
        ],
        triglycerides: [
            { value: 70, date: "2024-05" }, { value: 75, date: "2024-06" },
            { value: 80, date: "2024-07" }, { value: 85, date: "2024-08" },
            { value: 90, date: "2024-09" }, { value: 95, date: "2024-10" },
            { value: 100, date: "2024-11" }, { value: 105, date: "2024-12" },
            { value: 110, date: "2025-01" }, { value: 115, date: "2025-02" }
        ],
        vldl: [
            { value: 15, date: "2024-05" }, { value: 16, date: "2024-06" },
            { value: 17, date: "2024-07" }, { value: 18, date: "2024-08" },
            { value: 19, date: "2024-09" }, { value: 20, date: "2024-10" },
            { value: 21, date: "2024-11" }, { value: 22, date: "2024-12" },
            { value: 23, date: "2025-01" }, { value: 24, date: "2025-02" }
        ],
        cholesterolHdlRatio: [
            { value: 3.3, date: "2024-05" }, { value: 3.4, date: "2024-06" },
            { value: 3.5, date: "2024-07" }, { value: 3.6, date: "2024-08" },
            { value: 3.7, date: "2024-09" }, { value: 3.8, date: "2024-10" },
            { value: 3.9, date: "2024-11" }, { value: 4.0, date: "2024-12" },
            { value: 4.1, date: "2025-01" }, { value: 4.2, date: "2025-02" }
        ],
        ldlHdlRatio: [
            { value: 1.7, date: "2024-05" }, { value: 1.8, date: "2024-06" },
            { value: 1.9, date: "2024-07" }, { value: 2.0, date: "2024-08" },
            { value: 2.1, date: "2024-09" }, { value: 2.2, date: "2024-10" },
            { value: 2.3, date: "2024-11" }, { value: 2.4, date: "2024-12" },
            { value: 2.5, date: "2025-01" }, { value: 2.6, date: "2025-02" }
        ]
    };
    

    const fluctuatingSeedData = {
        totalCholesterol: [
            { value: 150, date: "2024-05" }, { value: 160, date: "2024-06" },
            { value: 155, date: "2024-07" }, { value: 170, date: "2024-08" },
            { value: 165, date: "2024-09" }, { value: 180, date: "2024-10" },
            { value: 175, date: "2024-11" }, { value: 190, date: "2024-12" },
            { value: 185, date: "2025-01" }, { value: 200, date: "2025-02" }
        ],
        hdl: [
            { value: 45, date: "2024-05" }, { value: 50, date: "2024-06" },
            { value: 48, date: "2024-07" }, { value: 52, date: "2024-08" },
            { value: 50, date: "2024-09" }, { value: 55, date: "2024-10" },
            { value: 53, date: "2024-11" }, { value: 57, date: "2024-12" },
            { value: 54, date: "2025-01" }, { value: 58, date: "2025-02" }
        ],
        ldl: [
            { value: 80, date: "2024-05" }, { value: 85, date: "2024-06" },
            { value: 82, date: "2024-07" }, { value: 88, date: "2024-08" },
            { value: 86, date: "2024-09" }, { value: 92, date: "2024-10" },
            { value: 90, date: "2024-11" }, { value: 95, date: "2024-12" },
            { value: 93, date: "2025-01" }, { value: 98, date: "2025-02" }
        ],
        triglycerides: [
            { value: 70, date: "2024-05" }, { value: 80, date: "2024-06" },
            { value: 75, date: "2024-07" }, { value: 85, date: "2024-08" },
            { value: 80, date: "2024-09" }, { value: 90, date: "2024-10" },
            { value: 85, date: "2024-11" }, { value: 95, date: "2024-12" },
            { value: 90, date: "2025-01" }, { value: 100, date: "2025-02" }
        ],
        vldl: [
            { value: 15, date: "2024-05" }, { value: 18, date: "2024-06" },
            { value: 16, date: "2024-07" }, { value: 19, date: "2024-08" },
            { value: 17, date: "2024-09" }, { value: 20, date: "2024-10" },
            { value: 18, date: "2024-11" }, { value: 21, date: "2024-12" },
            { value: 19, date: "2025-01" }, { value: 22, date: "2025-02" }
        ],
        cholesterolHdlRatio: [
            { value: 3.3, date: "2024-05" }, { value: 3.6, date: "2024-06" },
            { value: 3.4, date: "2024-07" }, { value: 3.7, date: "2024-08" },
            { value: 3.5, date: "2024-09" }, { value: 3.8, date: "2024-10" },
            { value: 3.6, date: "2024-11" }, { value: 3.9, date: "2024-12" },
            { value: 3.7, date: "2025-01" }, { value: 4.0, date: "2025-02" }
        ],
        ldlHdlRatio: [
            { value: 1.7, date: "2024-05" }, { value: 1.9, date: "2024-06" },
            { value: 1.8, date: "2024-07" }, { value: 2.0, date: "2024-08" },
            { value: 1.9, date: "2024-09" }, { value: 2.1, date: "2024-10" },
            { value: 2.0, date: "2024-11" }, { value: 2.2, date: "2024-12" },
            { value: 2.1, date: "2025-01" }, { value: 2.3, date: "2025-02" }
        ]
    };

    const randomSeedData = {
        totalCholesterol: [
            { value: 150, date: "05/05/2024" }, { value: 162, date: "06/06/2024" },
            { value: 158, date: "07/07/2024" }, { value: 172, date: "08/08/2024" },
            { value: 165, date: "09/09/2024" }, { value: 178, date: "10/10/2024" },
            { value: 170, date: "11/11/2024" }, { value: 189, date: "12/12/2024" },
            { value: 180, date: "01/01/2025" }, { value: 193, date: "02/02/2025" }
        ],
        hdl: [
            { value: 45, date: "05/05/2024" }, { value: 49, date: "06/06/2024" },
            { value: 46, date: "07/07/2024" }, { value: 51, date: "08/08/2024" },
            { value: 47, date: "09/09/2024" }, { value: 55, date: "10/10/2024" },
            { value: 50, date: "11/11/2024" }, { value: 54, date: "12/12/2024" },
            { value: 48, date: "01/01/2025" }, { value: 53, date: "02/02/2025" }
        ],
        ldl: [
            { value: 80, date: "05/05/2024" }, { value: 84, date: "06/06/2024" },
            { value: 78, date: "07/07/2024" }, { value: 89, date: "08/08/2024" },
            { value: 82, date: "09/09/2024" }, { value: 95, date: "10/10/2024" },
            { value: 86, date: "11/11/2024" }, { value: 92, date: "12/12/2024" },
            { value: 85, date: "01/01/2025" }, { value: 97, date: "02/02/2025" }
        ],
        triglycerides: [
            { value: 70, date: "05/05/2024" }, { value: 79, date: "06/06/2024" },
            { value: 74, date: "07/07/2024" }, { value: 82, date: "08/08/2024" },
            { value: 78, date: "09/09/2024" }, { value: 93, date: "10/10/2024" },
            { value: 87, date: "11/11/2024" }, { value: 98, date: "12/12/2024" },
            { value: 83, date: "01/01/2025" }, { value: 95, date: "02/02/2025" }
        ],
        vldl: [
            { value: 15, date: "05/05/2024" }, { value: 17, date: "06/06/2024" },
            { value: 14, date: "07/07/2024" }, { value: 20, date: "08/08/2024" },
            { value: 16, date: "09/09/2024" }, { value: 22, date: "10/10/2024" },
            { value: 19, date: "11/11/2024" }, { value: 21, date: "12/12/2024" },
            { value: 18, date: "01/01/2025" }, { value: 23, date: "02/02/2025" }
        ],
        cholesterolHdlRatio: [
            { value: 3.3, date: "05/05/2024" }, { value: 3.5, date: "06/06/2024" },
            { value: 3.4, date: "07/07/2024" }, { value: 3.8, date: "08/08/2024" },
            { value: 3.6, date: "09/09/2024" }, { value: 4.0, date: "10/10/2024" },
            { value: 3.7, date: "11/11/2024" }, { value: 3.9, date: "12/12/2024" },
            { value: 3.5, date: "01/01/2025" }, { value: 4.2, date: "02/02/2025" }
        ],
        ldlHdlRatio: [
            { value: 1.7, date: "05/05/2024" }, { value: 1.8, date: "06/06/2024" },
            { value: 1.6, date: "07/07/2024" }, { value: 2.1, date: "08/08/2024" },
            { value: 1.9, date: "09/09/2024" }, { value: 2.3, date: "10/10/2024" },
            { value: 2.0, date: "11/11/2024" }, { value: 2.2, date: "12/12/2024" },
            { value: 1.8, date: "01/01/2025" }, { value: 2.5, date: "02/02/2025" }
        ]
    };
    
    
    
    
    // Insert Data
    const seedDatabase = async () => {
        try {
            await LipidProfile.deleteMany(); // Clear existing data
            await LipidProfile.create(randomSeedData); // Insert new data
            console.log("Seed Data Inserted Successfully!");
            mongoose.connection.close();
        } catch (error) {
            console.error("Error Seeding Data:", error);
            mongoose.connection.close();
        }
    };



    seedDatabase();