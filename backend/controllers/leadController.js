// backend/controllers/leadController.js
import Lead from '../models/leadModel.js';
import { parseCSV, validateCSVData } from '../utils/csvParser.js';

// ✅ Upload Leads Controller for CSV Files
export const uploadLeads = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        const filePath = req.file.path;

        // ✅ Parse CSV and Validate Data
        const leads = await parseCSV(filePath);
        const validationErrors = validateCSVData(leads);
        
        if (validationErrors.length > 0) {
            return res.status(400).json({ error: 'Invalid CSV data', validationErrors });
        }

        // ✅ Check for Duplicate Leads (Based on LinkedIn URL)
        for (const lead of leads) {
            const existingLead = await Lead.findOne({ linkedinUrl: lead.linkedinUrl });
            if (existingLead) {
                return res.status(409).json({ error: `Duplicate lead detected: ${lead.linkedinUrl}` });
            }
        }

        // ✅ Save Leads to Database
        await Lead.insertMany(leads);
        res.status(201).json({ message: 'Leads uploaded successfully!', leads });
    } catch (error) {
        console.error('Error uploading leads:', error);
        res.status(500).json({ error: 'Failed to upload leads.' });
    }
};

// ✅ Fetch All Leads Controller (No Changes Needed)
export const getAllLeads = async (req, res) => {
    try {
        const leads = await Lead.find();
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch leads.' });
    }
};

// ✅ Delete Lead Controller (No Changes Needed)
export const deleteLead = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedLead = await Lead.findByIdAndDelete(id);
        if (!deletedLead) {
            return res.status(404).json({ error: 'Lead not found' });
        }
        res.status(200).json({ message: 'Lead deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete lead.' });
    }
};
