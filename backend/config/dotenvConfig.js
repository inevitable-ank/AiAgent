// backend/config/dotenvConfig.js
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Check for required variables
const requiredVariables = ['MONGO_URI', 'JWT_SECRET', 'CONTENT_SCORING_API_URL'];
requiredVariables.forEach((variable) => {
    if (!process.env[variable]) {
        console.error(`ERROR: Missing environment variable ${variable}`);
        process.exit(1);
    }
});

export default dotenv;
