// src/components/MessagePreview.jsx
import React, { useState } from "react";

const MessagePreview = () => {
    const [formData, setFormData] = useState({
        target_title: "",
        target_name: "",
        target_industry: "",
        core_message: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [suggestedMessages, setSuggestedMessages] = useState([]);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuggestedMessages([]);

        try {
            const response = await fetch("/api/suggestions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            

            if (!response.ok) {
                throw new Error("Failed to fetch suggestions. Please try again.");
            }

            const data = await response.json();
            setSuggestedMessages(data.messages || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4 text-blue-600">Generate Message Suggestions</h2>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="target_title"
                    placeholder="Target Title (e.g., Marketing Manager)"
                    value={formData.target_title}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="target_name"
                    placeholder="Target Name (e.g., Alex)"
                    value={formData.target_name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="target_industry"
                    placeholder="Target Industry (e.g., Tech)"
                    value={formData.target_industry}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <textarea
                    name="core_message"
                    placeholder="Core Message (e.g., We should collaborate on a tech initiative.)"
                    value={formData.core_message}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <button
                    type="submit"
                    className={`bg-blue-500 text-white px-4 py-2 rounded ${
                        isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                    }`}
                    disabled={isLoading}
                >
                    {isLoading ? "Generating..." : "Generate Suggestions"}
                </button>
            </form>

            {/* Error Message */}
            {error && <p className="text-red-600 mt-4">{error}</p>}

            {/* Suggested Messages Section */}
            {suggestedMessages.length > 0 && (
                <div className="mt-6 space-y-4">
                    <h3 className="text-xl font-semibold text-green-600">Suggested Messages</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {suggestedMessages.map((message, index) => (
                            <div
                                key={index}
                                className="p-4 border rounded-lg shadow hover:shadow-md transition-all bg-gray-100"
                            >
                                <p className="text-gray-700">{message}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessagePreview;
