'use client';

import { Bar, Pie } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useEffect, useState } from 'react';

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function VisitorsDashboard() {
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [visitorsByHour, setVisitorsByHour] = useState({});
  const [genderStats, setGenderStats] = useState({ male: 0, female: 0 });
  const [visitorsByState, setVisitorsByState] = useState({});
  const [ageGroups, setAgeGroups] = useState({});
  const [bidangPekerjaanStats, setBidangPekerjaanStats] = useState({});
  const [jenisOrganisasiStats, setJenisOrganisasiStats] = useState({});

  useEffect(() => {
    const fetchData = () => {
      fetch('/api/visitors/stats')
        .then((res) => res.json())
        .then((data) => {
          setTotalVisitors(data.totalVisitors);
          setVisitorsByHour(data.visitorsByHour);
          setGenderStats(data.genderStats);
          setVisitorsByState(data.visitorsByState);
          setAgeGroups(data.ageGroups);
          setBidangPekerjaanStats(data.bidangPekerjaanStats);
          setJenisOrganisasiStats(data.jenisOrganisasiStats);
        })
        .catch((error) => console.error('Error fetching data:', error));
    };

    // Initial fetch
    fetchData();

    // Set up an interval to refetch data every 15 seconds
    const intervalId = setInterval(fetchData, 15000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // 1. Display Total Number of Visitors
  const renderTotalVisitors = () => (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold mb-2">Total Visitors</h2>
      <p className="text-4xl font-bold text-blue-600">{totalVisitors}</p>
    </div>
  );

  // 2. Histogram for Visitors by Hour
  const visitorsByHourData = {
    labels: Object.keys(visitorsByHour), // ['10 AM', '11 AM', '12 PM', etc.]
    datasets: [
      {
        label: 'Visitors by Hour',
        data: Object.values(visitorsByHour),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // 3. Pie Chart for Male vs Female Visitors
  const genderData = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: '# of Visitors',
        data: [genderStats.male, genderStats.female],
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  // 4. Bar Chart for Visitors by State
  const visitorsByStateData = {
    labels: Object.keys(visitorsByState), // ['JOHOR', 'MELAKA', etc.]
    datasets: [
      {
        label: 'Visitors by State',
        data: Object.values(visitorsByState),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  // 5. Histogram Grouped by Age
  const ageGroupsData = {
    labels: Object.keys(ageGroups), // Age groups like ['20-30', '31-40', etc.]
    datasets: [
      {
        label: 'Visitors by Age Group',
        data: Object.values(ageGroups),
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  // 6. Bar Chart for Visitors by Bidang Pekerjaan
  const bidangPekerjaanData = {
    labels: Object.keys(bidangPekerjaanStats),
    datasets: [
      {
        label: 'Visitors by Bidang Pekerjaan',
        data: Object.values(bidangPekerjaanStats),
      },
    ],
  };

  // 7. Bar Chart for Visitors by Jenis Organisasi
  const jenisOrganisasiData = {
    labels: Object.keys(jenisOrganisasiStats),
    datasets: [
      {
        label: 'Visitors by Jenis Organisasi',
        data: Object.values(jenisOrganisasiStats),
      },
    ],
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-6">
      <div className="container mx-auto grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 1. Total Number of Visitors */}
        {renderTotalVisitors()}

        {/* 2. Histogram for Visitors by Hour */}
        <div className="bg-white p-10 rounded-lg shadow-md col-span-3 h-[300px]">
          <h2 className="text-xl font-semibold mb-2">Visitors by Hour</h2>
          <Bar data={visitorsByHourData} />
        </div>

        {/* 3. Pie Chart for Male vs Female Visitors */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Male vs Female Visitors</h2>
          <Pie data={genderData} />
        </div>

        {/* 4. Bar Chart for Visitors by State */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Visitors by State</h2>
          <Bar data={visitorsByStateData} options={{ indexAxis: 'y' }} />
        </div>

        {/* 5. Histogram for Visitors Grouped by Age */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Visitors by Age Group</h2>
          <Bar data={ageGroupsData} options={{ indexAxis: 'y' }} />
        </div>

        {/* 6. Bar Chart for Visitors by Bidang Pekerjaan */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Visitors by Occupation Field</h2>
          <Bar data={bidangPekerjaanData} options={{ indexAxis: 'y' }} />
        </div>

        {/* 7. Bar Chart for Visitors by Jenis Organisasi */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Visitors by Organization Type</h2>
          <Bar data={jenisOrganisasiData} options={{ indexAxis: 'y' }} />
        </div>
      </div>
    </div>
  );
}
