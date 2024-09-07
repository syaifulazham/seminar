'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Logout, GoStats } from '@/components/useful';
import { VscPreview, VscCheck, VscPass, VscEye } from "react-icons/vsc";


const PillApproved = () => {
  return (
    <div className="flex flex-row items-center p-1 bg-green-500 text-white rounded-md">
      <VscCheck className="mr-2" />
      Approved
    </div>
  );
};

const PillUnderReview = () => {
  return (
    <div className="flex flex-row items-center p-1 bg-orange-500 text-white rounded-md">
      <VscCheck className="mr-2" />
      Under Review
    </div>
  );
};

const PillPending = () => {
  return (
    <div className="flex flex-row items-center p-1 bg-red-500 text-white rounded-md">
      <VscCheck className="mr-2" />
      Pending
    </div>
  );
};

const AdminPage = () => {
  const router = useRouter();
  const [participants, setParticipants] = useState<{ id: number; name: string; email: string; category: string; status: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    const fetchParticipants = async () => {
      try {
        const res = await fetch('/api/participants');
        const data = await res.json();
        setParticipants(data);
      } catch (err) {
        setError('Failed to load participants');
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  const handleReviewClick = (id: number) => {
    router.push(`/admin/review/${id}`);
  };

  const handleToggleStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'Approved' ? 'UnderReview' : 'Approved';
    try {
      await fetch(`/api/participants/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      setParticipants((prevParticipants) =>
        prevParticipants.map((participant) =>
          participant.id === id ? { ...participant, status: newStatus } : participant
        )
      );
    } catch (err) {
      setError('Failed to update status');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      
    <div className="container mx-auto p-8">
    
      <div className="flex flex-row justify-between items-center mb-6 ">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="flex flex-row items-center ml-auto">
          <GoStats />
          <Logout />
        </div>
      </div>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {loading ? (
        <p>Loading participants...</p>
      ) : (
        <table className="min-w-full bg-white text-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">
                <div className="flex flex-col items-center">
                  <span className="mr-2">Category</span>
                  <select className="border border-gray-300 rounded-md p-1">
                    <option value="">All Category</option>
                    <option value="With HRDC - Online">With HRDC - Online</option>
                    <option value="With HRDC - Offline">With HRDC - Offline</option>
                    <option value="Without HRDC - Online">Without HRDC - Online</option>
                    <option value="Without HRDC - Offline">Without HRDC - Offline</option>
                  </select>
                </div>
              </th>
              <th className="py-2 px-4 border-b">
                <div className="flex flex-col items-center">
                  <span className="mr-2">Status</span>
                  <select className="border border-gray-300 rounded-md p-1">
                    <option value="">All Status</option>
                    <option value="Approved">Approved</option>
                    <option value="UnderReview">Under Review</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant) => (
              <tr key={participant.id}>
                <td className="py-2 px-4 border-b">{participant.name}</td>
                <td className="py-2 px-4 border-b">{participant.email}</td>
                <td className="py-2 px-4 border-b">{participant.category}</td>
                <td className="py-2 px-4 border-b">{participant.status === 'Approved' ? <PillApproved /> : participant.status === 'UnderReview' ? <PillUnderReview /> : <PillPending />}</td>
                <td className="py-2 px-4 border-b flex flex-row items-center">
                  <button
                    onClick={() => handleReviewClick(participant.id)}
                    className="mr-2 text-blue-600 flex items-center border border-blue-600 rounded-md px-2 py-1 hover:bg-blue-600 hover:text-white text-sm"
                  >
                    <VscEye className="mr-2" /> Review
                  </button>
                  {participant.status === 'UnderReview' && (
                    <button
                      onClick={() => handleToggleStatus(participant.id, participant.status)}
                      className="flex items-center text-sm text-green-600 hover:bg-green-600 hover:text-white border border-green-600 rounded-md px-2 py-1"
                  >
                    <VscCheck className="mr-2" />
                    Approve
                  </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    
    </div>
  );
};

export default AdminPage;
