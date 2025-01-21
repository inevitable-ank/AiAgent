// src/components/Campaigns/CampaignForm.jsx
import React, { useState } from "react";

const CampaignForm = ({ onCreateCampaign }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        market: "Global", // Default market
    });

    const markets = ["Global", "US", "Europe", "Asia", "Australia"]; // Example markets

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateCampaign(formData);
        setFormData({ name: "", description: "", market: "Global" });
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Create New Campaign</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Campaign Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Campaign Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <div>
                    <label htmlFor="market" className="block font-medium mb-1">
                        Select LeadSet:
                    </label>
                    <select
                        id="market"
                        name="market"
                        value={formData.market}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        {markets.map((market) => (
                            <option key={market} value={market}>
                                {market}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition-all"
                >
                    Create Campaign
                </button>
            </form>
        </div>
    );
};

export default CampaignForm;
