// backend/controllers/campaignController.js
import Campaign from '../models/campaignModel.js';
import { startOutreachAutomation } from '../services/automationService.js';

// Create a New Campaign
export const createCampaign = async (req, res) => {
    try {
        const { name, description, startDate, endDate, csvFilePath, coreMessage } = req.body;

        if (!name || !description || !coreMessage) {
            return res.status(400).json({ error: 'Name, Description, and Core Message are required.' });
        }

        const newCampaign = new Campaign({ name, description, startDate, endDate });
        await newCampaign.save();

        // Trigger automation only if CSV and core message are provided
        if (csvFilePath && coreMessage) {
            await startOutreachAutomation(csvFilePath, coreMessage);
        }

        res.status(201).json({ message: 'Campaign created successfully!', campaign: newCampaign });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create campaign.' });
    }
};

// Fetch All Campaigns
export const getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        res.status(200).json(campaigns);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch campaigns.' });
    }
};

// Update a Campaign
export const updateCampaign = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const updatedCampaign = await Campaign.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!updatedCampaign) {
            return res.status(404).json({ error: 'Campaign not found.' });
        }

        res.status(200).json({ message: 'Campaign updated successfully!', campaign: updatedCampaign });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update campaign.' });
    }
};

// Delete a Campaign
export const deleteCampaign = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCampaign = await Campaign.findByIdAndDelete(id);
        if (!deletedCampaign) {
            return res.status(404).json({ error: 'Campaign not found.' });
        }

        res.status(200).json({ message: 'Campaign deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete campaign.' });
    }
};
