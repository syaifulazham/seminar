'use client';

import { FaUsers, FaCheckCircle, FaHourglassHalf, FaClipboardCheck } from 'react-icons/fa';

interface StatsPanelProps {
  totalParticipants: number;
  statusData: {
    Pending: number;
    Approved: number;
    UnderReview: number;
  };
  categoryData: {
    WithHRDCPhysical: number;
    WithHRDCOnline: number;
    WithoutHRDCPhysical: number;
    WithoutHRDCOnline: number;
  };
}

export const StatsPanel: React.FC<StatsPanelProps> = ({
  totalParticipants,
  statusData,
  categoryData,
}) => {
  return (
    <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold w-full text-center">Registration Stats</h1>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-4 p-6 bg-gray-100 rounded-xl shadow-lg mx-6">
        {/* Total Participants */}
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center space-y-2 text-center">
            <FaUsers className="text-4xl text-blue-600" />
            <span className="text-2xl font-bold text-gray-700">{totalParticipants}</span>
            <span className="text-sm text-gray-500">Total Participants</span>
        </div>

        {/* Status: Pending */}
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center space-y-2 text-center">
            <FaHourglassHalf className="text-4xl text-yellow-500" />
            <span className="text-2xl font-bold text-gray-700">{statusData.Pending}</span>
            <span className="text-sm text-gray-500">Pending</span>
        </div>

        {/* Status: Approved */}
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center space-y-2 text-center">
            <FaCheckCircle className="text-4xl text-green-500" />
            <span className="text-2xl font-bold text-gray-700">{statusData.Approved}</span>
            <span className="text-sm text-gray-500">Approved</span>
        </div>

        {/* Status: Under Review */}
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center space-y-2 text-center">
            <FaClipboardCheck className="text-4xl text-orange-500" />
            <span className="text-2xl font-bold text-gray-700">{statusData.UnderReview}</span>
            <span className="text-sm text-gray-500">Under Review</span>
        </div>

        
        </div>

        <h1 className="text-2xl font-bold w-full text-center">Category Stats</h1>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-4 p-6 bg-gray-100 rounded-xl shadow-lg mx-6">
            {/* Category: With HRDC - Physical */}
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center space-y-2 text-center">
            <FaCheckCircle className="text-4xl text-purple-600" />
            <span className="text-2xl font-bold text-gray-700">{categoryData.WithHRDCPhysical}</span>
            <span className="text-sm text-gray-500">With HRDC - Physical</span>
        </div>

        {/* Category: With HRDC - Online */}
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center space-y-2 text-center">
            <FaCheckCircle className="text-4xl text-teal-600" />
            <span className="text-2xl font-bold text-gray-700">{categoryData.WithHRDCOnline}</span>
            <span className="text-sm text-gray-500">With HRDC - Online</span>
        </div>

        {/* Category: Without HRDC - Physical */}
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center space-y-2 text-center">
            <FaCheckCircle className="text-4xl text-red-600" />
            <span className="text-2xl font-bold text-gray-700">{categoryData.WithoutHRDCPhysical}</span>
            <span className="text-sm text-gray-500">Without HRDC - Physical</span>
        </div>

        {/* Category: Without HRDC - Online */}
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center space-y-2 text-center">
            <FaCheckCircle className="text-4xl text-indigo-600" />
            <span className="text-2xl font-bold text-gray-700">{categoryData.WithoutHRDCOnline}</span>
            <span className="text-sm text-gray-500">Without HRDC - Online</span>
        </div>
        </div>
    </div>
  );
};
