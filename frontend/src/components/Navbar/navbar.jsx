// src/components/Navbar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import UploadLeadSet from '../Upload/uploadLeadSet';

const Navbar = () => {
    const { darkMode, toggleTheme } = useTheme();
    const [showUploadModal, setShowUploadModal] = useState(false);

    const toggleUploadModal = () => {
        setShowUploadModal(!showUploadModal);
    };

    return (
        <>
            <nav className="bg-[#235c7a] dark:bg-gray-800 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <h1 className="text-white dark:text-yellow-300 text-2xl font-bold">
                                Zafo.ai
                            </h1>
                        </div>

                        {/* Links */}
                        <div className="hidden md:flex space-x-8">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `text-white dark:text-gray-300 hover:text-yellow-300 font-medium ${
                                        isActive ? 'border-b-2 border-yellow-300' : ''
                                    }`
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/campaigns"
                                className={({ isActive }) =>
                                    `text-white dark:text-gray-300 hover:text-yellow-300 font-medium ${
                                        isActive ? 'border-b-2 border-yellow-300' : ''
                                    }`
                                }
                            >
                                Campaigns
                            </NavLink>
                            <NavLink
                                to="/leads"
                                className={({ isActive }) =>
                                    `text-white dark:text-gray-300 hover:text-yellow-300 font-medium ${
                                        isActive ? 'border-b-2 border-yellow-300' : ''
                                    }`
                                }
                            >
                                Leads
                            </NavLink>

                            {/* Upload Leads Button */}
                            <button
                                onClick={toggleUploadModal}
                                className="bg-yellow-400 text-blue-800 px-4 py-2 rounded hover:bg-yellow-500 transition-all"
                            >
                                Upload Leads
                            </button>
                        </div>

                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-full shadow-md focus:outline-none hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                        >
                            {darkMode ? '☀️' : '🌙'}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Upload Leads Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                        <button
                            onClick={toggleUploadModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
                        >
                            &times;
                        </button>
                        <UploadLeadSet closeModal={toggleUploadModal} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
