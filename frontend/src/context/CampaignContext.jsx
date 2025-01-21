// src/context/CampaignContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import apiService from "../services/apiService";

const CampaignContext = createContext();

export const CampaignProvider = ({ children }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch campaigns when the provider is mounted
    apiService.fetchCampaigns().then((data) => {
      setCampaigns(data);
      setLoading(false); // Set loading to false once data is fetched
    });
  }, []);

  const addCampaign = (newCampaign) => {
    const isDuplicate = campaigns.some((campaign) => campaign.id === newCampaign.id);
    if (!isDuplicate) {
      setCampaigns((prevCampaigns) => [...prevCampaigns, newCampaign]);
    }
  };

  const updateCampaign = (updatedCampaign) => {
    setCampaigns(
      campaigns.map((c) => (c.id === updatedCampaign.id ? updatedCampaign : c))
    );
  };

  return (
    <CampaignContext.Provider
      value={{ campaigns, addCampaign, updateCampaign, loading }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaignContext = () => useContext(CampaignContext);
