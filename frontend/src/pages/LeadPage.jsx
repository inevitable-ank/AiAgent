// src/pages/LeadPage.jsx
import React from "react";
import LeadTable from "../components/Leads/leadTable";
import LeadStatus from "../components/Leads/leadStatus";
import { useLeadContext } from "../context/LeadContext";

const LeadPage = () => {
    const { selectedList, setSelectedList, filterLeadsByList, updateLeadStatus } = useLeadContext();
    const filteredLeads = filterLeadsByList();

    const handleListChange = (e) => {
        setSelectedList(e.target.value);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Manage Leads</h1>

            {/* Dropdown for Lead List Selection */}
            <div className="mb-4 text-center">
                <label htmlFor="lead-list" className="text-lg font-medium mr-2">
                    Select Lead List:
                </label>
                <select
                    id="lead-list"
                    value={selectedList}
                    onChange={handleListChange}
                    className="p-2 border rounded"
                >
                    <option value="All">All</option>
                    <option value="List 1">List 1</option>
                    <option value="List 2">List 2</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Lead Table */}
                <LeadTable leads={filteredLeads} />

                {/* Lead Status Management */}
                <div className="space-y-4">
                    {filteredLeads.map((lead) => (
                        <LeadStatus key={lead.id} lead={lead} onUpdateStatus={updateLeadStatus} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LeadPage;
