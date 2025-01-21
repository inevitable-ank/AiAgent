import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Dashboard = () => {
    // Sample data for the performance chart
    const campaignMetrics = {
        labels: ['January', 'February', 'March', 'April'], // Months
        datasets: [
            {
                label: 'Campaigns Created',
                data: [3, 5, 2, 8], // Number of campaigns created each month
                backgroundColor: 'rgba(54, 162, 235, 0.6)', // Bar color
                borderColor: 'rgba(54, 162, 235, 1)', // Border color
                borderWidth: 1,
            },
            {
                label: 'Campaigns Completed',
                data: [2, 4, 1, 6], // Number of campaigns completed each month
                backgroundColor: '#bdced7', // Bar color
                borderColor: '#bdced7', // Border color
                borderWidth: 1,
            },
        ],
    };

    // Chart.js options for customization
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 space-y-8">
            {/* Welcome Header */}
            <h1 className="text-4xl font-bold text-center text-blue-600 dark:text-yellow-300 mb-6">
                Welcome to Zafo.ai Dashboard
            </h1>

            {/* Metrics Summary Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-2">Total Campaigns</h2>
                    <p className="text-3xl font-bold text-blue-600">12</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-2">Active Campaigns</h2>
                    <p className="text-3xl font-bold text-green-600">5</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-2">Completed Campaigns</h2>
                    <p className="text-3xl font-bold text-red-600">7</p>
                </div>
            </div>

            {/* Campaign Performance Chart */}
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Campaign Performance</h2>
                <div className="h-96">
                    <Bar data={campaignMetrics} options={options} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
