// backend/services/linkedinService.js
import axios from 'axios';

const LINKEDIN_API_URL = 'https://api.linkedin.com/v2/';

// ✅ Send Connection Request (Using the Correct Endpoint)
export const sendConnectionRequest = async (linkedinUrl, accessToken) => {
    try {
        const payload = {
            "invitation": {
                "connectee": linkedinUrl
            }
        };
        const response = await axios.post(`${LINKEDIN_API_URL}relationships`, payload, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error sending connection request:', error.response?.data || error.message);
        throw new Error('Failed to send LinkedIn connection request.');
    }
};

// ✅ Send Personalized Message
export const sendMessage = async (linkedinUrl, message, accessToken) => {
    try {
        const response = await axios.post(`${LINKEDIN_API_URL}messages`, {
            recipient: linkedinUrl,
            message
        }, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error sending LinkedIn message:', error.response?.data || error.message);
        throw new Error('Failed to send LinkedIn message.');
    }
};

export default { sendConnectionRequest, sendMessage };
