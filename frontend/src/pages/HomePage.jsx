// src/pages/HomePage.jsx
import React from "react";
import Dashboard from "../components/Dashboard/dashboard";
import CampaignList from "../components/Campaigns/CampaignList";
import MessagePreview from "../components/MessagePreview/messagePreview";
import { useCampaignContext } from "../context/CampaignContext";

const HomePage = () => {
    const { campaigns, loading } = useCampaignContext();

    return (
        <div className="min-h-screen bg-gray-50 p-8 space-y-8">
            {/* Dashboard Section */}
            <Dashboard />

            {/* Message Preview Section */}
            <div className="mt-8">
                <MessagePreview />
            </div>

            {/* Campaign List Section */}
            <div className="mt-8">
                {loading ? (
                    <p className="text-center text-gray-500">Loading campaigns...</p>
                ) : (
                    <CampaignList campaigns={campaigns} onSelectCampaign={() => {}} />
                )}
            </div>
        </div>
    );
};

export default HomePage;
