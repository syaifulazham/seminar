// components/TentativeSchedule.tsx
import React from 'react';
import { FaChalkboardTeacher, FaCoffee, FaUtensils, FaRunning, FaMicrophone, FaCalendarCheck } from 'react-icons/fa';

type JadualItem = {
  id: number;
  masa: string;
  perkara: string[];
};

type TentatifItem = {
  label: string;
  jadual: JadualItem[];
};

const TentativeSchedule: React.FC<{ tentatif: TentatifItem[] }> = ({ tentatif }) => {
  return (
    <div className="max-w-7xl mx-auto p-4 grid gap-8 text-sm">
      {tentatif.map((day, index) => (
        <div key={index} className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white text-center">{day.label}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {day.jadual.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="text-lg font-bold text-gray-800">{item.masa}</div>
                </div>
                <div className="flex-1">
                  {item.perkara.map((activity, idx) => (
                    <div key={idx} className="flex items-start space-x-4 mb-3">
                      <span className="text-blue-500 text-2xl">
                        {getActivityIcon(activity)}
                      </span>
                      <p className="text-gray-700">{activity}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Function to determine the appropriate icon based on the activity description
const getActivityIcon = (activity: string) => {
  if (activity.toLowerCase().includes('sarapan') || activity.toLowerCase().includes('makan')) {
    return <FaUtensils />;
  } else if (activity.toLowerCase().includes('pembentangan') || activity.toLowerCase().includes('program')) {
    return <FaChalkboardTeacher />;
  } else if (activity.toLowerCase().includes('senaman')) {
    return <FaRunning />;
  } else if (activity.toLowerCase().includes('rehat') || activity.toLowerCase().includes('minum')) {
    return <FaCoffee />;
  } else if (activity.toLowerCase().includes('majlis')) {
    return <FaMicrophone />;
  } else {
    return <FaCalendarCheck />;
  }
};

export default TentativeSchedule;
