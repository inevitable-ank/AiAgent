// src/components/Upload/UploadLeadSet.jsx
import React, { useState } from 'react';
import apiService from '../../services/apiService';

const UploadLeadSet = ({ closeModal }) => {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setUploadStatus('');
    };

    const handleUpload = async () => {
        if (!file) {
            setUploadStatus('Please select a file before uploading.');
            return;
        }

        setIsUploading(true);
        setUploadStatus('');

        try {
            const response = await apiService.uploadLeadSet(file);
            setUploadStatus(response.message);

            // Close modal after successful upload
            setTimeout(() => {
                if (closeModal) closeModal();
            }, 1500);
        } catch (error) {
            setUploadStatus(error.message);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Upload Lead Set</h2>
            <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="border p-2 rounded"
            />
            <div className="flex space-x-4">
                <button
                    onClick={handleUpload}
                    className={`bg-blue-500 text-white px-4 py-2 rounded ${
                        isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                    } transition-all`}
                    disabled={isUploading}
                >
                    {isUploading ? 'Uploading...' : 'Upload Leads'}
                </button>
                <button
                    onClick={closeModal}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-all"
                >
                    Close
                </button>
            </div>
            {uploadStatus && (
                <p
                    className={`text-lg font-medium ${
                        uploadStatus.includes('successfully')
                            ? 'text-green-600'
                            : 'text-red-600'
                    }`}
                >
                    {uploadStatus}
                </p>
            )}
        </div>
    );
};

export default UploadLeadSet;
