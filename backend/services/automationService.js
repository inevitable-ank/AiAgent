// backend/services/automationService.js
import linkedinService from './linkedinService.js';
import { parseCSV, validateCSVData } from '../utils/csvParser.js';
import llmService from './llmService.js';

// ✅ Automate Outreach
export const startOutreachAutomation = async (csvFilePath, coreMessage, accessToken) => {
    try {
        const leads = await parseCSV(csvFilePath);
        const validationErrors = validateCSVData(leads);

        if (validationErrors.length > 0) throw new Error('Invalid CSV data.');

        for (const lead of leads) {
            try {
                const message = await llmService.generateMessage(lead, coreMessage);
                await linkedinService.sendConnectionRequest(lead.linkedinUrl, accessToken);
                await linkedinService.sendMessage(lead.linkedinUrl, message, accessToken);
                console.log(`Outreach completed for lead: ${lead.name}`);
            } catch (err) {
                console.error(`Failed for lead ${lead.name}: ${err.message}`);
            }
        }

        return { success: true, message: 'Outreach completed for all leads.' };
    } catch (error) {
        console.error('Automation Error:', error.message);
        throw new Error('Automation process failed.');
    }
};
