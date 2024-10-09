'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { VscEye } from 'react-icons/vsc';
import { Logout, GoStats } from '@/components/useful';
import { PillApproved, PillUnderReview, PillPending, PillRejected } from '@/components/Pills';
import ParticipantDetailsModal from '@/components/ParticipantDetails';

const AdminPage = () => {
  const router = useRouter();
  const [participants, setParticipants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedParticipant, setSelectedParticipant] = useState<any | null>(null);

  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    const fetchParticipants = async () => {
      try {
        const res = await fetch(`/api/participants?timestamp=${new Date().getTime()}`, {
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
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
    setSelectedParticipant(participant);
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
    setSelectedParticipant(null);
  };

  const filteredParticipants = participants.filter((participant) => {
    const searchFilter = searchTerm.toLowerCase();
    return (
      (categoryFilter === '' || participant.category === categoryFilter) &&
      (statusFilter === '' || participant.status === statusFilter) &&
      (
        participant.id.toString().padStart(6, '0').includes(searchFilter) ||
        participant.name.toLowerCase().includes(searchFilter) ||
        participant.email.toLowerCase().includes(searchFilter) ||
        participant.ic.toLowerCase().includes(searchFilter) ||
        participant.ministry.toLowerCase().includes(searchFilter)
      )
    );
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredParticipants.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredParticipants.length / recordsPerPage);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  // Helper function to display limited pagination buttons with ellipsis
  const renderPaginationButtons = () => {
    const maxPagesToShow = 5;
    let pages = [];

    // Create pagination buttons with ellipsis for large page counts
    if (totalPages <= maxPagesToShow) {
      pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);

      pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

      // Add ellipsis if there are more pages to show
      if (startPage > 1) {
        pages = [1, '...', ...pages];
      }
      if (endPage < totalPages) {
        pages = [...pages, '...', totalPages];
      }
    }

    return pages.map((page, index) => {
      if (typeof page === 'string') {
        return (
          <span key={index} className="px-3 py-1">
            {page}
          </span>
        );
      }
      return (
        <button
          key={index}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 rounded-md ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 min-w-[1000px] max-w-[1000px]">
      <div className="flex flex-row justify-between items-center w-full p-6 bg-white shadow">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex flex-row space-x-4 ml-auto">
          <GoStats />
          <Logout />
        </div>
      </div>
      <div className="container mx-auto p-6">
        {error && <div className="mb-4 text-red-500">{error}</div>}
        {loading ? (
          <p>Loading participants...</p>
        ) : (
          <div>
            {/* Search and Filters */}
            <div className="flex flex-row justify-between mb-4">
              <input
                type="text"
                placeholder="Search by name, email, IC..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-md p-2 mr-2 w-full"
              />
              <div className="flex flex-col mr-2">
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
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Records Per Page Selector */}
            <div className="flex flex-row items-center justify-end mb-4">
              <span className="mr-2">Records per page: </span>
              <select
                value={recordsPerPage}
                onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                className="border border-gray-300 rounded-md p-1"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
              </select>
              
            </div>

            {/* Participants table */}
            <table className="min-w-full bg-white text-sm">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Invoice</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Category</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((participant) => (
                  <tr key={participant.id}>
                    <td className="py-2 px-4 border-b">IKARKP24-{participant.id.toString().padStart(6, '0')}</td>
                    <td className="py-2 px-4 border-b">{participant.name}</td>
                    <td className="py-2 px-4 border-b">{participant.email}</td>
                    <td className="py-2 px-4 border-b">{participant.category}</td>
                    <td className="py-2 px-4 border-b">
                      {participant.status === 'Approved' ? (
                        <PillApproved />
                      ) : participant.status === 'UnderReview' ? (
                        <PillUnderReview />
                      ) : participant.status === 'Rejected' ? (
                        <PillRejected />
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

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex space-x-2">
                {renderPaginationButtons()}
              </div>
            </div>

            {/* Participant Details Modal */}
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
