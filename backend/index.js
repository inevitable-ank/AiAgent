import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to handle suggestions
app.post("/api/suggestions", async (req, res) => {
    try {
        const { target_title, target_name, target_industry, core_message } = req.body;

        // Validate the input
        if (!target_title || !target_name || !target_industry || !core_message) {
            console.error("Missing fields in request body:", req.body);
            return res.status(400).json({ error: "All fields are required." });
        }

        const apiEndpoint = process.env.API_ENDPOINT;

        console.log("Forwarding request to:", apiEndpoint);
        console.log("Request payload:", { target_title, target_name, target_industry, core_message });

        // Forward the request to the third-party API
        const response = await axios.post(apiEndpoint, {
            target_title,
            target_name,
            target_industry,
            core_message,
        });

        console.log("Third-party API response:", response.data);

        // Send the API's response back to the frontend
        res.json(response.data);
    } catch (err) {
        if (err.response) {
            // The server responded with a status code outside 2xx range
            console.error("Error response from third-party API:", err.response.data);
            res.status(err.response.status).json({ error: err.response.data });
        } else if (err.request) {
            // No response was received
            console.error("No response received from third-party API:", err.request);
            res.status(500).json({ error: "No response from third-party API." });
        } else {
            // Other errors
            console.error("Error occurred while making the request:", err.message);
            res.status(500).json({ error: "Failed to fetch suggestions. Try again later." });
        }
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
