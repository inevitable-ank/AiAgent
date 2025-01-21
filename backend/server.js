// backend/server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/dbConfig.js';
import './config/dotenvConfig.js';
import leadRoutes from './routes/leadRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
// import campaignRoutes from './routes/campaignRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Apply middlewares
app.use(cors());
app.use(bodyParser.json());
// app.use('/api/campaigns', campaignRoutes);

// Mount routes
app.use('/api/leads', leadRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
