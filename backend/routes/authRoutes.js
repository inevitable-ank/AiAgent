// backend/routes/authRoutes.js
import express from 'express';
import { registerUser, loginUser, getProfile } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const { LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET, LINKEDIN_REDIRECT_URI } = process.env;
let savedAccessToken = ''; // Temporarily store the token in memory

// ✅ Register & Login Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getProfile);

// ✅ LinkedIn OAuth Redirect (Using Proper URL Encoding)
router.get('/linkedin', (req, res) => {
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(LINKEDIN_REDIRECT_URI)}&scope=r_liteprofile%20r_emailaddress%20w_member_social`;
    res.redirect(authUrl);
});

// ✅ LinkedIn OAuth Callback (Fixed Redirect URI Encoding)
router.get('/linkedin/callback', async (req, res) => {
    const code = req.query.code;

    // ✅ Prevent Missing Code Errors
    if (!code) {
        return res.status(400).json({ error: 'Authorization code is missing.' });
    }

    try {
        const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
            params: {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: LINKEDIN_REDIRECT_URI,
                client_id: LINKEDIN_CLIENT_ID,
                client_secret: LINKEDIN_CLIENT_SECRET
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        savedAccessToken = response.data.access_token;
        console.log("✅ Access Token Generated:", savedAccessToken);
        res.json({ message: 'LinkedIn Authorization Successful!', accessToken: savedAccessToken });
    } catch (error) {
        console.error('OAuth Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'LinkedIn OAuth failed.' });
    }
});

// ✅ Test Token (Ensure Token is Correctly Stored)
router.get('/linkedin/test', async (req, res) => {
    try {
        if (!savedAccessToken) {
            return res.status(401).json({ error: 'No LinkedIn access token found. Authenticate first.' });
        }
        const response = await axios.get('https://api.linkedin.com/v2/me', {
            headers: {
                Authorization: `Bearer ${savedAccessToken}`
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Token Test Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Token test failed.' });
    }
});

export default router;
