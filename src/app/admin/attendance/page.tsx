// /app/admin/attendance/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa'; // Import Spinner from react-icons
import { GrCertificate } from "react-icons/gr";
import { ReturnHome, Logout, GoStats } from '@/components/useful';
import { useRouter } from 'next/navigation';
import { FaCheckCircle } from "react-icons/fa";

export const dynamic = 'force-dynamic';  // Forces dynamic rendering

type AttendanceRecord = {
    id: string;
    name: string;
    ic: string;
    email: string;
    telephoneNumber: string;
    department: string;
    category: string;
    hrdc: string;
    seminar_mode: string;
    day_1: number;
    day_2: number;
    qrCode: string;
    cert: number;
};

export default function AdminAttendancePage() {
    const router = useRouter();
    const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
    const [filteredData, setFilteredData] = useState<AttendanceRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingCertificate, setLoadingCertificate] = useState<Set<string>>(new Set()); // Track loading per participant

    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [hrdcFilter, setHrdcFilter] = useState<'All' | 'With HRDC' | 'Without HRDC'>('All');
    const [seminarModeFilter, setSeminarModeFilter] = useState<'All' | 'Online' | 'Physical'>('All');
    const [dayFilter, setDayFilter] = useState<'All' | '26 Okt' | '27 Okt' | 'Both'>('All');

    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState<{ record: AttendanceRecord; day: 1 | 2 } | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/admin/login');
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch('/api/attendance/record', { method: 'GET' });
                const data = await response.json();
                setAttendanceData(data.attendanceRecords);
                setFilteredData(data.attendanceRecords);
            } catch (error) {
                console.error('Error fetching attendance data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        let data = attendanceData;
        if (searchTerm) {
            const lowerCaseSearch = searchTerm.toLowerCase();
            data = data.filter(
                (record) =>
                    record.name.toLowerCase().includes(lowerCaseSearch) ||
                    record.ic.toLowerCase().includes(lowerCaseSearch) ||
                    record.department.toLowerCase().includes(lowerCaseSearch)
            );
        }

        if (hrdcFilter !== 'All') data = data.filter((record) => record.hrdc === hrdcFilter);
        if (seminarModeFilter !== 'All') data = data.filter((record) => record.seminar_mode === seminarModeFilter);

        if (dayFilter === '26 Okt') data = data.filter((record) => record.day_1 * 1 === 1 && record.day_2 * 1 === 0);
        if (dayFilter === '27 Okt') data = data.filter((record) => record.day_2 * 1 === 1 && record.day_1 * 1 === 0);
        if (dayFilter === 'Both') data = data.filter((record) => record.day_1 * 1 === 1 && record.day_2 * 1 === 1);

        setFilteredData(data);
    }, [attendanceData, searchTerm, hrdcFilter, seminarModeFilter, dayFilter]);

    const handleToggleAttendance = (record: AttendanceRecord, day: 1 | 2) => {
        setModalData({ record, day });
        setShowModal(true);
    };

    const handleProceed = async () => {
        if (!modalData) return;
        const { record, day } = modalData;
        const qrCode = record.qrCode; // Use `ic` or any identifier as `qrCode`
        const label = day === 1 ? '26-10-2024' : '27-10-2024';
        const isPresent = day === 1 ? record.day_1 * 1 === 1 : record.day_2 * 1 === 1;

        try {
            if (!isPresent) {
                // Record attendance if not present
                await fetch('/api/attendance/record', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ qrCode, label }),
                });
            } else {
                // Delete attendance if already present
                await fetch(`/api/attendance/record`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ qrCode, label }),
                });
            }
            window.location.reload();
            setShowModal(false);
        } catch (error) {
            console.error('Error updating attendance:', error);
        }
    };

    const handleSendCertificate = async (participantId: string) => {
        setLoadingCertificate((prev) => new Set(prev).add(participantId)); // Set loading state to the participant ID
        try {
            await fetch(`/api/cert/send`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ participantId }),
            });
        } catch (error) {
            console.error('Error sending certificate:', error);
        } finally {
            setLoadingCertificate((prev) => {
                const newLoadingState = new Set(prev);
                newLoadingState.delete(participantId); // Remove participant from loading set
                return newLoadingState;
            });
        }
    };

    return (
        <div className="p-8 min-h-screen w-[80vw]">
            {/* Header */}
            <div className="flex flex-row justify-between items-center w-full p-6 bg-white shadow mb-6">
                <h1 className="text-2xl font-bold">Certificate Award</h1>
                <div className="flex flex-row space-x-4 ml-auto">
                    <ReturnHome />
                    <GoStats />
                    <Logout />
                </div>
            </div>

            {/* Filter Controls */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by name, IC, or department"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border border-gray-300 rounded mb-4 w-full"
                />


                <div className="flex flex-row gap-4 text-xs">
                    {/* HRDC Filter Group */}
                    <div className="flex flex-col">
                        <p className="text-sm">HRDC</p>
                        <div className="flex space-x-1 mb-4 border-r border-solid border-black pr-2">
                            <button
                                onClick={() => setHrdcFilter('All')}
                                className={`px-4 py-2 rounded ${hrdcFilter === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                Both
                            </button>
                            <button
                                onClick={() => setHrdcFilter('With HRDC')}
                                className={`px-4 py-2 rounded ${hrdcFilter === 'With HRDC' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                With
                            </button>
                            <button
                                onClick={() => setHrdcFilter('Without HRDC')}
                                className={`px-4 py-2 rounded ${hrdcFilter === 'Without HRDC' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                Without
                            </button>
                        </div>
                    </div>


                    {/* Seminar Mode Filter Group */}
                    <div className="flex flex-col">
                        <p className="text-sm">Seminar Mode</p>
                        <div className="flex space-x-1 mb-4 border-r border-solid border-black pr-2">
                            <button
                                onClick={() => setSeminarModeFilter('All')}
                                className={`px-4 py-2 rounded ${seminarModeFilter === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setSeminarModeFilter('Online')}
                                className={`px-4 py-2 rounded ${seminarModeFilter === 'Online' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                Online
                            </button>
                            <button
                                onClick={() => setSeminarModeFilter('Physical')}
                                className={`px-4 py-2 rounded ${seminarModeFilter === 'Physical' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                Physical
                            </button>
                        </div>
                    </div>

                    {/* Day Filter Group */}
                    <div className="flex flex-col">
                        <p className="text-sm">Attendance</p>
                        <div className="flex space-x-1 mb-4">
                            <button
                                onClick={() => setDayFilter('All')}
                                className={`px-4 py-2 rounded ${dayFilter === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                Any
                            </button>
                            <button
                                onClick={() => setDayFilter('26 Okt')}
                                className={`px-4 py-2 rounded ${dayFilter === '26 Okt' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                26 Okt
                            </button>
                            <button
                                onClick={() => setDayFilter('27 Okt')}
                                className={`px-4 py-2 rounded ${dayFilter === '27 Okt' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                27 Okt
                            </button>
                            <button
                                onClick={() => setDayFilter('Both')}
                                className={`px-4 py-2 rounded ${dayFilter === 'Both' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                Both Days
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <div>
                Number of Record: {filteredData.length}
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300 text-sm">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 w-10">Inv. Series</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Name/ Email/ Phone</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">IC</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Department</th>
                            <th className="border border-gray-300 px-4 py-2 w-24">Package</th>
                            <th className="border border-gray-300 px-4 py-2 w-24">Mode</th>
                            <th className="border border-gray-300 px-4 py-2 w-24">26 Okt</th>
                            <th className="border border-gray-300 px-4 py-2 w-24">27 Okt</th>
                            <th className="border border-gray-300 px-4 py-2 w-24">Gen. Cert</th>
                            <th className="border border-gray-300 px-4 py-2 w-14">Cert Sent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((record) => (
                            <tr key={record.id}>
                                <td className="border border-gray-300 px-4 py-2 text-center">{record.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{record.name} <br /> <span className="text-xs text-gray-500">{record.email}</span> <br /> <span className="text-xs text-gray-500">{record.telephoneNumber}</span></td>
                                <td className="border border-gray-300 px-4 py-2">{record.ic}</td>
                                <td className="border border-gray-300 px-4 py-2">{record.department}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{record.hrdc === 'With HRDC' ? 'HRDC' : 'Normal'}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{record.seminar_mode}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button
                                        onClick={() => handleToggleAttendance(record, 1)}
                                        className={`px-2 py-1 rounded ${record.day_1 * 1 === 1 ? 'bg-green-500' : 'bg-red-500'} text-white`}
                                    >
                                        {record.day_1 * 1 === 1 ? 'Hadir' : 'X Hadir'}
                                    </button>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button
                                        onClick={() => handleToggleAttendance(record, 2)}
                                        className={`px-2 py-1 rounded ${record.day_2 * 1 === 1 ? 'bg-green-500' : 'bg-red-500'} text-white`}
                                    >
                                        {record.day_2 * 1 === 1 ? 'Hadir' : 'X Hadir'}
                                    </button>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                {loadingCertificate.has(record.id) ? (
                                        <FaSpinner className="animate-spin" />
                                    ) : record.cert === 1 ? (
                                        <FaCheckCircle className="text-green-500" />
                                    ) : (
                                        <button
                                            onClick={() => handleSendCertificate(record.id)}
                                            className="px-2 py-1 bg-blue-500 text-white rounded"
                                            disabled={loadingCertificate.has(record.id)}
                                        >
                                            <GrCertificate />
                                        </button>
                                    )}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center text-2xl">
                                    <div className="flex flex-row items-center justify-center">
                                        {record.cert * 1 === 1 ? <FaCheckCircle className="text-green-500" /> : ''}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Modal */}
            {showModal && modalData && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <p>
                            This participant is currently{' '}
                            {modalData.day === 1
                                ? modalData.record.day_1 * 1 === 1
                                    ? 'present'
                                    : 'not present'
                                : modalData.record.day_2 * 1 === 1
                                    ? 'present'
                                    : 'not present'}{' '}
                            for {modalData.day === 1 ? '26 Okt' : '27 Okt'}.
                        </p>
                        <p className="text-sm">Are you sure you want to proceed?</p>
                        <p className="text-sm">Proceed with this will change status to {' '}
                            <span className="font-bold text-red-500">
                                {modalData.day === 1
                                    ? modalData.record.day_1 * 1 === 1
                                        ? 'not present'
                                        : 'present'
                                    : modalData.record.day_2 * 1 === 1
                                        ? 'not present'
                                        : 'present'}{' '}
                            </span>.
                        </p>
                        <div className="flex space-x-4 mt-4">
                            <button
                                onClick={handleProceed}
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
