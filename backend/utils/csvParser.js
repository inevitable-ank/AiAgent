// backend/utils/csvParser.js
import csv from 'csv-parser';
import fs from 'fs';

// ✅ Updated CSV Parsing Function
export const parseCSV = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                results.push({
                    name: `${row.first_name} ${row.last_name}`,  // Combining first and last name
                    email: row.email || row.personal_email,     // Using either field
                    linkedinUrl: row.linkedin_url,              // Direct from CSV
                    title: row.title,                           // Added title
                    industry: row.industry                      // Added industry
                });
            })
            .on('end', () => resolve(results))
            .on('error', (error) => reject('Error parsing CSV: ' + error.message));
    });
};

// ✅ Fixed CSV Validator (Matching Your CSV)
export const validateCSVData = (data) => {
    const errors = [];
    data.forEach((row, index) => {
        if (!row.name || !row.email || !row.linkedinUrl) {
            errors.push(`Row ${index + 1} is missing required fields (name, email, LinkedIn URL).`);
        }
    });
    return errors;
};
