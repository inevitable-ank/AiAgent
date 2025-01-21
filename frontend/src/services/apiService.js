// src/services/apiService.js
const apiService = {
    uploadLeadSet: async (file) => {
      // Mock the upload process
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("File uploaded:", file.name);
          resolve({ message: "File uploaded successfully!" });
        }, 1000);
      });
    },
  
    createCampaign: async (campaignData) => {
      // Mock campaign creation
      return new Promise((resolve) => {
        setTimeout(() => {
          const newCampaign = { id: Date.now(), ...campaignData, status: "New" };
          console.log("Campaign created:", newCampaign);
          resolve(newCampaign);
        }, 1000);
      });
    },
  
    fetchCampaigns: async () => {
      // Mock fetching campaigns
      return new Promise((resolve) => {
        setTimeout(() => {
          const sampleCampaigns = [
            { id: 1, name: "AI Outreach Campaign", description: "Using AI to connect.", status: "Active" },
            { id: 2, name: "Marketing Blitz", description: "Aggressive marketing.", status: "Completed" },
          ];
          console.log("Fetched campaigns:", sampleCampaigns);
          resolve(sampleCampaigns);
        }, 1000);
      });
    },
  };
  
  export default apiService;
  