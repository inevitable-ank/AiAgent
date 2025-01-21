// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CampaignPage from './pages/CampaignPage';
import LeadPage from './pages/LeadPage';
import Navbar from './components/Navbar/navbar';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { CampaignProvider } from './context/CampaignContext';
import { LeadProvider } from './context/LeadContext';

const App = () => {
    return (
        <ThemeProvider>
            <NotificationProvider>
                <CampaignProvider>
                    <LeadProvider> {/* Ensure the LeadProvider wraps components that use it */}
                        <Router
                            future={{
                                v7_startTransition: true,
                                v7_relativeSplatPath: true,
                            }}
                        >
                            <Navbar />
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/campaigns" element={<CampaignPage />} />
                                <Route path="/leads" element={<LeadPage />} />
                            </Routes>
                        </Router>
                    </LeadProvider>
                </CampaignProvider>
            </NotificationProvider>
        </ThemeProvider>
    );
};

export default App;
