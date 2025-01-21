// src/components/Leads/LeadStatus.jsx
import React, { useState } from 'react';

const LeadStatus = ({ lead, onUpdateStatus }) => {
    const [status, setStatus] = useState(lead.status);

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        onUpdateStatus(lead.id, newStatus);
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-2">{lead.name}</h2>
            <p className="text-gray-700">Email: {lead.email}</p>
            <p className="mt-2 text-lg">Status:</p>
            <select
                value={status}
                onChange={handleStatusChange}
                className="p-2 border rounded w-full"
            >
                <option value="Interested">Interested</option>
                <option value="No Reply">No Reply</option>
                <option value="Not Interested">Not Interested</option>
            </select>
        </div>
    );
};

export default LeadStatus;
