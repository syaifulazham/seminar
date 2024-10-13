'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Participant } from '@prisma/client';
const UploadPage = () => {
  const router = useRouter();
  const params = useParams(); // Use useParams to get the dynamic route parameter
  const id = params.id; // This will retrieve '5' in /upload/5
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadParticipant = async () => {
    const res = await fetch(`/api/participants/hash/${id}`);
    const data = await res.json();
    setParticipant(data);
  };

  const [participant, setParticipant] = useState<Participant | null>(null);

  useEffect(() => {
    loadParticipant();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('paymentProof', file);

    try {
      const res = await fetch(`/api/upload/${id}`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to upload payment proof.');
      }

      // Navigate to the thank-you page or success page
      router.push('/upload-thank-you');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-md shadow-md">
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Upload Payment Proof</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <h3>Invoice Number: <span className="font-bold">IKARKP24-{participant?.id.toString().padStart(6, '0')}</span></h3>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">
            Payment Proof (Image or PDF)

          </label>
          <input
            type="file"
            id="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default UploadPage;
