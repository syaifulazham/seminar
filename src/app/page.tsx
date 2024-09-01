import Link from 'next/link';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-xl">
        <h1 className="text-3xl font-bold text-black-800 mb-6">SEMINAR</h1>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Garis Panduan Pentaksiran dan Pengurusan Risiko Psikososial Pekerjaan di Tempat Kerja 2024
        </h1>
        <p className="text-gray-600 mb-4">
          <strong>Tarikh:</strong> 26-27 Oktober 2024 (Sabtu - Ahad: 2 hari)
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Golongan Sasaran:</strong> Majikan / Pengurus Sumber Manusia / Pekerja / Pengamal KKP
        </p>
        <p className="text-gray-600 mb-6">
          <strong>Mata CEP:</strong> 15 mata
        </p>
        <Link href="/register" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Sertai Seminar
        </Link>
      </div>
    </div>
  );
};

export default Home;
