'use client';
export const dynamic = 'force-dynamic';  // Forces dynamic rendering
import { useEffect, useState } from 'react';
import { ReturnHome, Logout } from '@/components/useful';
import { Bar, Line, Pie } from 'react-chartjs-2';  // Using chart.js for graphs
import { FaUsers } from 'react-icons/fa';  // Icons for visual representation
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

export default function StatsPage() {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        const fetchStats = async () => {
            const res = await fetch('/api/stats');
            const data = await res.json();
            setStats(data);
        };
        fetchStats();
    }, []);

    if (!stats) {
        return <div>Loading...</div>;
    }

    // Preparing chart data
    const statusData = {
        labels: stats.statusCounts.map((stat: any) => stat.status),
        datasets: [
            {
                label: 'Status',
                data: stats.statusCounts.map((stat: any) => stat._count.status),
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0'],
            },
        ],
    };

    const categoryData = {
        labels: stats.categoryCounts.map((cat: any) => cat.category),
        datasets: [
            {
                label: 'Categories',
                data: stats.categoryCounts.map((cat: any) => cat._count.category),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
        ],
    };

    // Now the registrationsByDate is structured with 'date' and 'count'
    const registrationData = {
        labels: stats.registrationsByDate.map((date: any) => date.date),  // Use the 'date' field directly
        datasets: [
            {
                label: 'Cumulative Registrations',
                data: stats.registrationsByDate.map((date: any) => date.count),  // Use the 'count' field
                borderColor: '#36A2EB',
                fill: false,
            },
        ],
    };

    // Mapping the top origins with counts for horizontal bar chart
    const topOriginLabels = stats.topOrigins.map((origin: any) => `${origin.town}, ${origin.state.substring(0, 3)}`);
    const topOriginCounts = stats.topOrigins.map((origin: any) => origin._count.town);

    const topOriginData = {
        labels: topOriginLabels,
        datasets: [
            {
                label: 'Top Origin Locations',
                data: topOriginCounts,
                backgroundColor: '#36A2EB',
                borderColor: '#36A2EB',
                borderWidth: 1,
            },
        ],
    };

    const topOriginOptions = {
        indexAxis: 'y',  // This makes the bar chart horizontal
        scales: {
            x: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Header */}
            <div className="flex flex-row justify-between items-center w-full p-6 bg-white shadow">
                <h1 className="text-2xl font-bold">Stats</h1>
                <div className="flex flex-row space-x-4 ml-auto">
                    <ReturnHome />
                    <Logout />
                </div>
            </div>

            {/* Main Stats Section */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Total Participants */}
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex items-center space-x-4">
                        <FaUsers size={30} className="text-gray-600" />
                        <h2 className="text-lg font-semibold">Total Participants</h2>
                    </div>
                    <p className="text-3xl font-bold mt-4">{stats.totalRecords}</p>
                </div>

                {/* Status Distribution */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-lg font-semibold">Status Distribution</h2>
                    <div className="mt-4">
                        <Pie data={statusData} />
                    </div>
                </div>

                {/* Category Distribution */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-lg font-semibold">Category Distribution</h2>
                    <div className="mt-4">
                        <Pie data={categoryData} />
                    </div>
                </div>

                {/* Cumulative Registrations */}
                <div className="bg-white shadow rounded-lg p-6 col-span-2">
                    <h2 className="text-lg font-semibold">Cumulative Registrations</h2>
                    <div className="mt-4">
                        <Line data={registrationData} />
                    </div>
                </div>

                {/* Top Origin Locations (Horizontal Bar Chart) */}
                <div className="bg-white shadow rounded-lg p-6 ">
                    <h2 className="text-lg font-semibold">Top Origin Locations</h2>
                    <div className="mt-4">
                        <Bar data={topOriginData} options={{
                            ...topOriginOptions,
                            indexAxis: 'y', // Set to 'x' or 'y' as needed
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
