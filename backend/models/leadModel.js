// backend/models/leadModel.js
import mongoose from 'mongoose';

const leadSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        linkedinUrl: { type: String, required: true, unique: true },
        title: { type: String },              // Added title field
        industry: { type: String },           // Added industry field
        status: {                             // Kept the status field
            type: String,
            enum: ['Interested', 'No Reply', 'Not Interested'],
            default: 'No Reply'
        },
        createdAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

const Lead = mongoose.model('Lead', leadSchema);
export default Lead;
