// src/components/Campaigns/CampaignDetails.jsx
import React from "react";

const CampaignDetails = ({ campaign }) => {
    if (!campaign)
        return <p className="text-center mt-8">Select a campaign to view details.</p>;

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-4">{campaign.name}</h2>
            <p className="text-lg mb-2">Status: <span className="font-semibold">{campaign.status}</span></p>
            <p className="text-lg mb-2">Leads Contacted: {campaign.leadsContacted}</p>
            <p className="text-lg mb-2">Acceptance Rate: {campaign.acceptanceRate}%</p>
            <p className="text-lg mb-2">Market: <span className="font-semibold">{campaign.market}</span></p>
        </div>
    );
};

export default CampaignDetails;
