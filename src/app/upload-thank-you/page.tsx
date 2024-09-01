import Link from 'next/link';

const UploadThankYouPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Thank You for Uploading!</h1>
        <p className="text-gray-600 mb-6">Your payment proof has been successfully uploaded. We will review your submission and notify you via email once it has been approved.</p>
        <Link href="/" className="text-indigo-600 hover:underline">
          Go back to homepage
        </Link>
      </div>
    </div>
  );
};

export default UploadThankYouPage;
