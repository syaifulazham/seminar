'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import prisma from '@/lib/prisma';
import { ReturnHome } from '@/components/useful';

const ReviewPage = () => {
  const router = useRouter();
  const { id } = useParams(); // Get the participant ID from the URL
  const [participant, setParticipant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParticipant = async () => {
      try {
        const res = await fetch(`/api/participants/${id}`);
        const data = await res.json();
        setParticipant(data);
      } catch (err: unknown) { // Specify the type of err
        if (err instanceof Error) { // Check if err is an instance of Error
          setError(err.message);
        } else {
          setError('An unknown error occurred'); // Handle unknown error types
        }
      } finally {
        setLoading(false);
      }
    };

    fetchParticipant();
  }, [id]);

  const handleApproval = async (newStatus: string) => {
    try {
      const res = await fetch(`/api/participants/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        router.push('/admin');
      } else {
        throw new Error('Failed to update participant status');
      }
    } catch (err: unknown) { // Specify the type of err
      if (err instanceof Error) { // Check if err is an instance of Error
        setError(err.message);
      } else {
        setError('An unknown error occurred'); // Handle unknown error types
      }
    }
  };

  if (loading) {
    return <p>Loading participant details...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
    <div className="container mx-auto p-8">
      
      <div className="flex flex-row justify-between items-center mb-6 ">
      <h1 className="text-2xl font-bold">Review Payment Proof</h1>
        <div className="ml-auto">
          <ReturnHome />
        </div>
      </div>
      {participant ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">{participant.name}</h2>
          <p className="mb-4">
            <strong>Category:</strong> {participant.category}
          </p>
          <p className="mb-4">
            <strong>Status:</strong> {participant.status}
          </p>
          {participant.paymentProof ? (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Payment Proof:</h3>
              <a
                href={participant.paymentProof}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                View Uploaded Proof
              </a>
            </div>
          ) : (
            <p className="text-red-500 mb-4">No payment proof uploaded.</p>
          )}
          <div className="flex space-x-4">
            <button
              onClick={() => handleApproval('Approved')}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Approve
            </button>
            <button
              onClick={() => handleApproval('UnderReview')}
              className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
            >
              Mark for Further Review
            </button>
          </div>
        </div>
      ) : (
        <p>Participant not found.</p>
      )}
    </div>
    </div>
  );
};

export default ReviewPage;
