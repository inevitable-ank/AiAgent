// backend/models/campaignModel.js
import mongoose from 'mongoose';

const campaignSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        createdAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

const Campaign = mongoose.model('Campaign', campaignSchema);
export default Campaign;
