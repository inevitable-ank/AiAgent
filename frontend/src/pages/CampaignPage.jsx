// src/pages/CampaignPage.jsx
import React, { useState } from "react";
import CampaignList from "../components/Campaigns/CampaignList";
import { useNotification } from "../context/NotificationContext";
import CampaignDetails from "../components/Campaigns/CampaignDetails";
import CampaignForm from "../components/Campaigns/CampaignForm";
import { useCampaignContext } from "../context/CampaignContext";

const CampaignPage = () => {
  const { campaigns, addCampaign, loading } = useCampaignContext();
  const { addNotification } = useNotification();
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const handleSelectCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    addNotification(`Viewing details for "${campaign.name}"`, "info");
  };

  const handleCreateCampaign = (newCampaign) => {
    const createdCampaign = { id: Date.now(), ...newCampaign, status: "New" };
    addCampaign(createdCampaign);
    addNotification(
      `Campaign "${createdCampaign.name}" created successfully in ${createdCampaign.market} market!`,
      "success"
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">
        Manage Campaigns
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Campaign Form and List */}
        <div>
          <CampaignForm onCreateCampaign={handleCreateCampaign} />
          {loading ? (
            <p className="text-center text-gray-500">Loading campaigns...</p>
          ) : (
            <CampaignList
              campaigns={campaigns}
              onSelectCampaign={handleSelectCampaign}
            />
          )}
        </div>

        {/* Right Column: Campaign Details */}
        <div>
          <CampaignDetails campaign={selectedCampaign} />
        </div>
      </div>
    </div>
  );
};

export default CampaignPage;
