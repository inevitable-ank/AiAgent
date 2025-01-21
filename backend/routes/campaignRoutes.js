// backend/routes/campaignRoutes.js
import express from 'express';
import {
    createCampaign,
    getAllCampaigns,
    updateCampaign,
    deleteCampaign
} from '../controllers/campaignController.js';

import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protected Routes for Campaign Management with Core Message Support
router.post('/', authMiddleware, createCampaign);
router.get('/', authMiddleware, getAllCampaigns);
router.put('/:id', authMiddleware, updateCampaign);
router.delete('/:id', authMiddleware, deleteCampaign);

export default router;
