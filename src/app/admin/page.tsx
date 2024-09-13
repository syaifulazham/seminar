'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { VscPreview, VscCheck, VscPass, VscEye, VscClose } from 'react-icons/vsc';
import { Logout } from '@/components/useful';

// Pill Components (Status Badges)
const PillApproved = () => (
  <div className="flex flex-row items-center p-1 bg-green-500 text-white rounded-md">
    <VscCheck className="mr-2" />
    Approved
  </div>
);

const PillUnderReview = () => (
  <div className="flex flex-row items-center p-1 bg-orange-500 text-white rounded-md">
    <VscCheck className="mr-2" />
    Under Review
  </div>
);

const PillPending = () => (
  <div className="flex flex-row items-center p-1 bg-red-500 text-white rounded-md">
    <VscCheck className="mr-2" />
    Pending
  </div>
);

// Modal Component
const ParticipantDetailsModal = ({
  participant,
  onClose,
  onStatusChange,
}: {
  participant: any;
  onClose: () => void;
  onStatusChange: (id: number, status: string) => void;
}) => {
  if (!participant) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-[90%] lg:w-[600px] shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Participant Details</h2>
          <button onClick={onClose} className="text-red-600">
            <VscClose size={24} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Name:</strong> {participant.name}
          </div>
          <div>
            <strong>IC:</strong> {participant.ic}
          </div>
          <div>
            <strong>Ministry:</strong> {participant.ministry}
          </div>
          <div>
            <strong>Department:</strong> {participant.department}
          </div>
          <div>
            <strong>Address:</strong> {participant.address}
          </div>
          <div>
            <strong>Postcode:</strong> {participant.postcode}
          </div>
          <div>
            <strong>Town:</strong> {participant.town}
          </div>
          <div>
            <strong>State:</strong> {participant.state}
          </div>
          <div>
            <strong>Country:</strong> {participant.country}
          </div>
          <div>
            <strong>Email:</strong> {participant.email}
          </div>
          <div>
            <strong>Telephone Number:</strong> {participant.telephoneNumber}
          </div>
          <div>
            <strong>Category:</strong> {participant.category}
          </div>
        </div>

        {/* Payment Proof Viewer */}
        <div className="mb-4">
          <strong>Payment Proof:</strong>
          <div className="mt-2">
            {participant.paymentProof ? (
              participant.paymentProof.endsWith('.pdf') ? (
                <embed
                  src={participant.paymentProof}
                  type="application/pdf"
                  className="w-full h-64"
                  title="Payment Proof PDF"
                />
              ) : (
                <img src={participant.paymentProof} alt="Payment Proof" className="max-w-full h-auto" />
              )
            ) : (
              <p>No payment proof available.</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => onStatusChange(participant.id, 'UnderReview')}
            className="flex items-center text-sm bg-orange-500 text-white px-3 py-2 rounded-md hover:bg-orange-600"
          >
            Under Review
          </button>
          <button
            onClick={() => onStatusChange(participant.id, 'Approved')}
            className="flex items-center text-sm bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600"
          >
            Approve
          </button>
          <button
            onClick={() => onStatusChange(participant.id, 'Rejected')}
            className="flex items-center text-sm bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminPage = () => {
  const router = useRouter();
  const [participants, setParticipants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedParticipant, setSelectedParticipant] = useState<any | null>(null);

  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

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
  }, [router]);

  const handleReviewClick = (participant: any) => {
    setSelectedParticipant(participant); // Open modal with participant details
  };

  const handleToggleStatus = async (id: number, status: string) => {
    try {
      await fetch(`/api/participants/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      setParticipants((prevParticipants) =>
        prevParticipants.map((participant) =>
          participant.id === id ? { ...participant, status } : participant
        )
      );
    } catch (err) {
      setError('Failed to update status');
    }
    setSelectedParticipant(null); // Close modal after status update
  };

  const filteredParticipants = participants.filter((participant) => {
    return (
      (categoryFilter === '' || participant.category === categoryFilter) &&
      (statusFilter === '' || participant.status === statusFilter)
    );
  });

  return (
    <div className="flex flex-col min-h-screen lg:min-w-[1000px] lg:max-w-[1000px] bg-gray-100">
      <div className="container mx-auto p-8">
        <div className="flex flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
          <Logout />
        </div>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        {loading ? (
          <p>Loading participants...</p>
        ) : (
          <div>
            {/* Filters */}
            <div className="flex flex-row justify-between mb-4">
              <div className="flex flex-col">
                <span>Category</span>
                <select
                  className="border border-gray-300 rounded-md p-1"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All Category</option>
                  <option value="With HRDC - Online">With HRDC - Online</option>
                  <option value="With HRDC - Physical">With HRDC - Physical</option>
                  <option value="Without HRDC - Online">Without HRDC - Online</option>
                  <option value="Without HRDC - Physical">Without HRDC - Physical</option>
                </select>
              </div>
              <div className="flex flex-col">
                <span>Status</span>
                <select
                  className="border border-gray-300 rounded-md p-1"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All Status</option>
                  <option value="Approved">Approved</option>
                  <option value="UnderReview">Under Review</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            {/* Participants table */}
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
                {filteredParticipants.map((participant) => (
                  <tr key={participant.id}>
                    <td className="py-2 px-4 border-b">{participant.name}</td>
                    <td className="py-2 px-4 border-b">{participant.email}</td>
                    <td className="py-2 px-4 border-b">{participant.category}</td>
                    <td className="py-2 px-4 border-b">
                      {participant.status === 'Approved' ? (
                        <PillApproved />
                      ) : participant.status === 'UnderReview' ? (
                        <PillUnderReview />
                      ) : (
                        <PillPending />
                      )}
                    </td>
                    <td className="py-2 px-4 border-b flex flex-row items-center">
                      <button
                        onClick={() => handleReviewClick(participant)}
                        className="mr-2 text-blue-600 flex items-center border border-blue-600 rounded-md px-2 py-1 hover:bg-blue-600 hover:text-white text-sm"
                      >
                        <VscEye className="mr-2" /> View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Modal for Participant Details */}
            {selectedParticipant && (
              <ParticipantDetailsModal
                participant={selectedParticipant}
                onClose={() => setSelectedParticipant(null)}
                onStatusChange={handleToggleStatus}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
