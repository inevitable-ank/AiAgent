// src/context/LeadContext.jsx
import React, { createContext, useContext, useState } from "react";

const LeadContext = createContext();

export const LeadProvider = ({ children }) => {
    const [leads, setLeads] = useState([
        { id: 1, name: "John Doe", email: "john@example.com", status: "Interested", listName: "List 1" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", status: "No Reply", listName: "List 1" },
        { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "Not Interested", listName: "List 2" },
        { id: 4, name: "Bob Brown", email: "bob@example.com", status: "Interested", listName: "List 2" },
    ]);
    const [selectedList, setSelectedList] = useState("All");

    const updateLeadStatus = (leadId, newStatus) => {
        setLeads((prevLeads) =>
            prevLeads.map((lead) =>
                lead.id === leadId ? { ...lead, status: newStatus } : lead
            )
        );
    };

    const filterLeadsByList = () => {
        if (selectedList === "All") return leads;
        return leads.filter((lead) => lead.listName === selectedList);
    };

    return (
        <LeadContext.Provider
            value={{ leads, selectedList, setSelectedList, updateLeadStatus, filterLeadsByList }}
        >
            {children}
        </LeadContext.Provider>
    );
};

export const useLeadContext = () => useContext(LeadContext);
