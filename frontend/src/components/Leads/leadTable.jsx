// src/components/Leads/LeadTable.jsx
import React from 'react';

const LeadTable = ({ leads }) => {
    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Leads</h2>
            <table className="min-w-full table-auto border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.map((lead, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="border p-2">{lead.name}</td>
                            <td className="border p-2">{lead.email}</td>
                            <td className="border p-2">
                                <span
                                    className={`px-2 py-1 rounded ${
                                        lead.status === 'Interested'
                                            ? 'bg-green-100 text-green-700'
                                            : lead.status === 'No Reply'
                                            ? 'bg-yellow-100 text-yellow-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}
                                >
                                    {lead.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeadTable;
