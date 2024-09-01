import Link from 'next/link';

const ThankYouPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Thank You for Registering!</h1>
                <p className="text-gray-600 mb-6">Your registration has been successfully submitted. We have sent you an email with further instructions on how to complete your payment.</p>
                <Link href="/" className="text-indigo-600 hover:underline">
                    Go back to homepage
                </Link>

            </div>
        </div>
    );
};

export default ThankYouPage;
