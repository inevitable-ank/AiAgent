// backend/routes/leadRoutes.js
import express from 'express';
import multer from 'multer';
import { uploadLeads, getAllLeads, deleteLead } from '../controllers/leadController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

// ✅ Setup Multer for File Handling
const upload = multer({ dest: 'uploads/' }); // CSV will be stored in the 'uploads' folder

const router = express.Router();

// ✅ Protected Route for CSV File Upload (Now Uses Multer)
router.post('/upload', authMiddleware, upload.single('leadFile'), uploadLeads);

// ✅ Protected Route to Fetch All Leads
router.get('/', authMiddleware, getAllLeads);

// ✅ Protected Route to Delete a Lead
router.delete('/:id', authMiddleware, deleteLead);

export default router;
