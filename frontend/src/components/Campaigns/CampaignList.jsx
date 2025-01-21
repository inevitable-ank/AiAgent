// src/components/Campaigns/CampaignList.jsx
import React from "react";

const CampaignList = ({ campaigns, onSelectCampaign }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-4">Campaigns</h2>
      <ul className="divide-y divide-gray-300">
        {campaigns.map((campaign) => (
          <li
            key={campaign.id} // Use unique `id` for each campaign
            className="p-4 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
            onClick={() => onSelectCampaign(campaign)}
          >
            <span className="font-semibold">{campaign.name}</span>
            <span className="text-sm text-gray-500">{campaign.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CampaignList;
