// backend/services/llmService.js
import axios from 'axios';

// Custom LLM API Endpoint
const LLM_API_URL = process.env.CONTENT_SCORING_API_URL;

export const generateMessage = async (leadData, coreMessage) => {
    try {
        const payload = {
            target_title: leadData.title,
            target_name: leadData.name,
            target_industry: leadData.industry,
            core_message: coreMessage
        };

        const response = await axios.post(LLM_API_URL, payload);
        return response.data.suggestions[0]?.content;
    } catch (error) {
        console.error('Error generating personalized message:', error);
        throw new Error('Failed to generate personalized message.');
    }
};

export default { generateMessage };
