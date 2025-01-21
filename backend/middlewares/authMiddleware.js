// backend/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');

    // ✅ Ensure token exists
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        // ✅ Fix: Correct extraction of token and validation
        const token = authHeader.split(' ')[1];
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        // ✅ Fix: Ensure the user ID is passed correctly
        req.user = verified;  // Attaching the verified payload to `req.user`
        next();
    } catch (error) {
        console.error('Token Verification Error:', error);
        res.status(401).json({ error: 'Invalid or expired token.' });
    }
};

export default authMiddleware;
