'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Logout } from '@/components/useful';

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
        <div className="ml-auto">
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
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant) => (
              <tr key={participant.id}>
                <td className="py-2 px-4 border-b">{participant.name}</td>
                <td className="py-2 px-4 border-b">{participant.email}</td>
                <td className="py-2 px-4 border-b">{participant.category}</td>
                <td className="py-2 px-4 border-b">{participant.status}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleReviewClick(participant.id)}
                    className="mr-2 text-blue-600 hover:underline"
                  >
                    Review Payment
                  </button>
                  <button
                    onClick={() => handleToggleStatus(participant.id, participant.status)}
                    className="text-green-600 hover:underline"
                  >
                    {participant.status === 'Approved' ? 'Mark as Under Review' : 'Approve'}
                  </button>
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
