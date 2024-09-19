import { FC } from "react";
import { FaPhone, FaEnvelope, FaClipboardList, FaMedkit, FaUserMd, FaHeartbeat, FaStethoscope } from "react-icons/fa";
import { MdEvent, MdOutlineHealthAndSafety } from "react-icons/md";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import Link from "next/link";

// Step 1: JSON Data grouped by categories
const mainComponent = [
  {
    title: "Seminar & Pelancaran Garis Panduan",
    description: "Garis Panduan Pentaksiran dan Pengurusan Risiko Psikososial Pekerjaan di Tempat Kerja 2024",
    icon: FaClipboardList,
  }, {
    title: "Karnival Kesihatan Pekerjaan KESUMA MADANI",
    description: "Karnival Kesihatan Pekerjaan dengan pelbagai aktiviti interaktif dan pameran",
    icon: FaClipboardList,
  },
  {
    title: "Bengkel Kesihatan Pekerjaan & Higien Industri",
    description: "Bengkel mengenai Kesihatan Pekerjaan dan Higien Industri",
    icon: FaUserMd,
  },
]
// Komponen Program (Program Components)
const programItems = [

  {
    title: "Bengkel Occupational First Aid (BOFA) Bersama Industri",
    description: "Bengkel Pertolongan Cemas Pekerjaan bersama Industri",
    icon: FaMedkit,
    wid: "firstaid",
  },
  {
    title: "Bengkel Guidelines Occupational Noise Disorder",
    description: "Panduan untuk Masalah Pendengaran Berkaitan Bunyi",
    icon: FaClipboardList,
    wid: "noiserelated",
  },
  {
    title: "Bengkel Guidelines on Medical Surveillance Programme at Workplace",
    description: "Panduan untuk Program Pemantauan Perubatan di Tempat Kerja 2023",
    icon: FaClipboardList,
    wid: "medicalsurveillance",
  },
  {

    title: "Bengkel Spirometry for Occupational Health Practitioner",
    description: "Panduan Spirometry untuk Pengamal Kesihatan Pekerjaan 2024",
    icon: FaStethoscope,
    wid: "spirometry",
  },
  {

    title: "Bengkel Kesejahteraan Pekerjaan",
    description: "Amalan terbaik bagi pelaksanaan program kesejahteraan di tempat kerja",
    icon: FaHeartbeat,
    wid: "",
  },
  {
    title: "Bengkel Pemantapan Pusat Ujian Audiometrik",

    description: "Pemantapan pelaksanaan pusat ujian audiometrik",
    icon: FaUserMd,
    wid: "",
  },
  {

    title: "Bengkel Pengemaskinian Inventori Bahan Kimia Berbahaya CIMS - CATCH",
    description: "Perkembangan Terkini Berkaitan Daftar Kimia (Chemical Register) Format Baru Di Bawah Pindaan USECHH 202X",
    icon: FaClipboardList,
    wid: "",
  }
];


// Pelbagai Aktiviti Interaktif (Interactive Occupational Health Activities)
const interactiveItems = [
  {
    title: "40 Reruai Pameran KKP",
    description: "Ruang pameran menampilkan 40 reruai",
    icon: BsFillQuestionCircleFill,
  },
  {
    title: "Kuiz KKP Peringkat Sekolah Menengah & IPT",
    description: "Kuiz KKP peringkat sekolah menengah dan institusi pengajian tinggi",
    icon: BsFillQuestionCircleFill,
  },
  {
    title: "KESUMA MADANI 5K Virtual Steps Challenge",
    description: "Cabaran berjalan kaki maya dengan sasaran 5,000 langkah",
    icon: FaHeartbeat,
  },
  {
    title: "Cabutan Bertuah KKP",
    description: "Anda berpeluang membawa balik hadiah dari cabutan bertuah KKP",
    icon: FaHeartbeat,
  },
  {
    title: "Pemeriksaan SaringanKesihatan Penyakit Tidak Berjangkit & Gigi",
    description: "Pemeriksaan kesihatan untuk penyakit tidak berjangkit dan kesihatan gigi",
    icon: FaMedkit,
  },
  {
    title: "Klinik Konsultasi MyKKP",
    description: "Konsultasi kesihatan pekerjaan dengan pakar kesihatan pekerjaan",
    icon: FaUserMd,
  },
  {
    title: "Pameran Kesihatan Mental",
    description: "Pengurusan kesihatan mental di tempat kerja",
    icon: FaUserMd,
  },
  {
    title: "Demonstrasi Peralatan Higien Industri",
    description: "Demonstrasi peralatan berkaitan higien industri dan kesihatan pekerjaan",
    icon: FaClipboardList,
  }
];

// Maklumat Lanjut (Contact Information)
const contactInfo = {
  name: "Puan Najuah Abd Halim",
  phone: "+6017-2098620",
  email: "jkkp.bkesp@mohr.gov.my",
};

// Step 2: Reusable Card component
const MainCard: FC<{ title: string; description: string; Icon: any }> = ({ title, description, Icon }) => (
  <div className="bg-[#0077C8] shadow-lg rounded-lg p-6 m-4 flex flex-col items-center text-center">
    <Icon className="text-4xl text-white mb-4" />
    <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
    <p className="text-white">{description}</p>
  </div>
);

const Card: FC<{ title: string; description: string; Icon: any; wid: string }> = ({ title, description, Icon, wid }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 m-4 flex flex-col items-center text-center">
    <Icon className="text-4xl text-blue-600 mb-4" />

    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p>{description}</p>
    {wid && <Link href={`/workshop/${wid}`} className="text-blue-500 border border-blue-500 rounded-md px-4 py-2 hover:bg-blue-500 hover:text-white">Lihat Selengkapnya</Link>}
  </div>
);


// Step 3: Main component to display the sections
const HealthEventComponent: FC = () => {
  return (
    <div className="container mx-auto p-6 text-sm">

      {/* Komponen Program Section */}
      <h2 className="text-2xl font-semibold mb-6 flex flex-col items-center justify-center text-white sm:flex-row sm:text-center">
        <MdEvent className="mr-2" /> Komponen Utama Program
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mainComponent.map((item, index) => (
          <MainCard key={index} title={item.title} description={item.description} Icon={item.icon} />
        ))}
      </div>

      {/* Bengkel Kesihatan Pekerjaan & Higien Industri Section */}
      <h2 className="text-2xl font-semibold mb-6 flex flex-col items-center justify-center text-white sm:flex-row sm:text-center">
        <MdEvent className="mr-2" /> Bengkel Kesihatan Pekerjaan & Higien Industri
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programItems.map((item, index) => (
          <Card key={index} title={item.title} description={item.description} Icon={item.icon} wid={item.wid} />
        ))}
      </div>

      {/* Pelbagai Aktiviti Interaktif Section */}
      <h2 className="text-2xl font-semibold mt-12 mb-6 flex flex-col items-center justify-center text-white sm:flex-row sm:text-center">
        <MdOutlineHealthAndSafety className="mr-2" /> Pelbagai Aktiviti Interaktif
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interactiveItems.map((item, index) => (
          <Card key={index} title={item.title} description={item.description} Icon={item.icon} wid="" />
        ))}
      </div>

      {/* Maklumat Lanjut Section */}
      <div className="bg-gray-200 rounded-lg shadow-lg p-6 mt-12">
        <h2 className="text-2xl font-semibold flex items-center justify-center mb-4 sm:justify-start">
          <FaPhone className="mr-2" /> Maklumat Lanjut
        </h2>
        <p className="flex items-center mb-2 flex-col sm:flex-row">
          <FaPhone className="mr-2" /> {contactInfo.name}:
          <a href={`tel:${contactInfo.phone}`} className="text-blue-500 ml-2">{contactInfo.phone}</a>
        </p>
        <p className="flex items-center flex-col sm:flex-row">
          <FaEnvelope className="mr-2" /> Email:
          <a href={`mailto:${contactInfo.email}`} className="text-blue-500 ml-2">{contactInfo.email}</a>
        </p>
      </div>
    </div>
  );
};

export default HealthEventComponent;
