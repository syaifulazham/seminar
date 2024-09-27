export const dynamic = 'force-dynamic';  // Forces dynamic rendering

import { VscClose } from 'react-icons/vsc';
import Image from 'next/image';

interface ParticipantDetailsModalProps {
  participant: any;
  onClose: () => void;
  onStatusChange: (id: number, status: string) => void;
}

const ParticipantDetailsModal: React.FC<ParticipantDetailsModalProps> = ({
  participant,
  onClose,
  onStatusChange,
}) => {
  if (!participant) return null;

  const cacheBustedUrl = (url: string) => `${url}?t=${new Date().getTime()}`;
  const fileName = participant.paymentProof ? participant.paymentProof.replace('/uploads/', '') : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-sm">
      <div className="bg-white p-6 rounded-md w-[90%] lg:w-[600px] shadow-lg">
        {/* Modal content */}
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
            <strong>Address:</strong><br /> {participant.address}, {participant.postcode} {participant.town}, {participant.state}, {participant.country}
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
          <div className="mt-2 max-h-[300px] w-full overflow-auto">
            {participant.paymentProof ? (
              participant.paymentProof.endsWith('.pdf') ? (
                <embed
                  src={`/api/files/${encodeURIComponent(fileName)}`}
                  type="application/pdf"
                  className="w-full h-64"
                  title="Payment Proof PDF"
                />
              ) : (
                <Image
                  src={`/api/files/${encodeURIComponent(fileName)}`}
                  alt="Payment Proof"
                  width={500}
                  height={500}
                  layout="responsive"
                  objectFit="contain"
                />
              )
            ) : (
              <p>No payment proof available.</p>
            )}
          </div>
        </div>

        {/* Action buttons */}
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

export default ParticipantDetailsModal;
