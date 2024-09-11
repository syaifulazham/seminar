'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { countries } from '@/lib/data';
import { useSearchParams } from 'next/navigation'; // stays as it is

const RegisterPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState({
    name: '',
    ic: '',
    ministry: '',
    department: '',
    address: '',
    postcode: '',
    town: '',
    state: '',
    email: '',
    telephoneNumber: '',
    category: 'With HRDC - Physical',
    country: 'Malaysia',
  });

  // Ensure that searchParams are only accessed in the browser
  useEffect(() => {
    if (typeof window !== 'undefined') { // client-side check
      const type = searchParams.get('type');
      const category = searchParams.get('category');

      if (type && category) {
        setFormData((prevState) => ({
          ...prevState,
          category: `${
            category === 'withHRDC' ? 'With HRDC' : 'Without HRDC'
          } - ${type === 'physical' ? 'Physical' : 'Online'}`,
        }));
      }
    }
  }, [searchParams]);

  const [ministries, setMinistries] = useState([
    "SYARIKAT SWASTA",
    "SYARIKAT AWAM BERHAD",
    "PERTUBUHAN BUKAN KERAJAAN/ NGO",
    "KEMENTERIAN KEWANGAN (MOF)",
    "KEMENTERIAN KEMAJUAN DESA DAN WILAYAH (KKDW)",
    "KEMENTERIAN PERUSAHAAN PERLADANGAN DAN KOMODITI (MPIC)",
    "KEMENTERIAN PENGANGKUTAN (MOT)",
    "KEMENTERIAN PERTANIAN DAN INDUSTRI MAKANAN (KPKM)",
    "KEMENTERIAN EKONOMI",
    "KEMENTERIAN PERUMAHAN DAN KERAJAAN TEMPATAN (KPKT)",
    "KEMENTERIAN PERTAHANAN (MINDEF)",
    "KEMENTERIAN KERJA RAYA (KKR)",
    "KEMENTERIAN DALAM NEGERI (KDN)",
    "KEMENTERIAN PERDAGANGAN ANTARABANGSA DAN INDUSTRI (MITI)",
    "KEMENTERIAN PENDIDIKAN TINGGI (KPT)",
    "KEMENTERIAN SAINS, TEKNOLOGI DAN INOVASI (MOSTI)",
    "KEMENTERIAN PEMBANGUNAN WANITA, KELUARGA DAN MASYARAKAT (KPWKM)",
    "KEMENTERIAN PERDAGANGAN DALAM NEGERI DAN KOS SARA HIDUP (KPDN)",
    "KEMENTERIAN SUMBER ASLI DAN KELESTRIAN ALAM (NRES)",
    "KEMENTERIAN PERALIHAN TENAGA DAN TRANSFORMASI AIR (PETRA)",
    "KEMENTERIAN PEMBANGUNAN USAHAWAN DAN KOPERASI (KUSKOP)",
    "KEMENTERIAN LUAR NEGERI (KLN)",
    "KEMENTERIAN PELANCONGAN, SENI DAN BUDAYA (MOTAC)",
    "KEMENTERIAN PENDIDIKAN MALAYSIA (KPM)",
    "KEMENTERIAN PERPADUAN NEGARA (KPN)",
    "KEMENTERIAN BELIA DAN SUKAN (KBS)",
    "KEMENTERIAN SUMBER MANUSIA (KESUMA)",
    "KEMENTERIAN KESIHATAN MALAYSIA (KKM)",
    "KEMENTERIAN DIGITAL"
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to register');
      }

      router.push('/thank-you');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6">Pendaftaran Seminar </h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama <small className="text-xs text-gray-500 italic">(Name)</small></label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
            <label htmlFor="ic" className="block text-sm font-medium text-gray-700">No K/P/ Passport <small className="text-xs text-gray-500 italic">(IC/ Passport Number)</small></label>
          <input
            type="text"
            id="ic"
            name="ic"
            value={formData.ic}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="ministry" className="block text-sm font-medium text-gray-700">Jenis Organisasi <small className="text-xs text-gray-500 italic">(Organization Type)</small></label>
          <select
            id="ministry"
            name="ministry"
            value={formData.ministry}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Organization Type</option>
            {ministries.map((ministry, index) => (
              <option key={index} value={ministry}>{ministry}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">Jabatan/ Agensi/ Syarikat/ Pertubuhan <small className="text-xs text-gray-500 italic">(Department/ Agency/ Company/ Organization)</small></label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">Negara <small className="text-xs text-gray-500 italic">(Country you currently reside in)</small></label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a country</option>
            {countries.map((country, index) => (
              <option key={index} value={country.name}>{country.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Alamat <small className="text-xs text-gray-500 italic">(Address)</small></label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="postcode" className="block text-sm font-medium text-gray-700">Poskod <small className="text-xs text-gray-500 italic">(Postcode)</small></label>
            <input
              type="text"
              id="postcode"
              name="postcode"
              value={formData.postcode}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="town" className="block text-sm font-medium text-gray-700">Bandar <small className="text-xs text-gray-500 italic">(Town)</small></label>
            <input
              type="text"
              id="town"
              name="town"
              value={formData.town}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">Negeri <small className="text-xs text-gray-500 italic">(State)</small></label>
            {formData.country === 'Malaysia' ? (
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select a state</option>
                <option value="JOHOR">JOHOR</option>
                <option value="MELAKA">MELAKA</option>
                <option value="NEGERI SEMBILAN">NEGERI SEMBILAN</option>
                <option value="SELANGOR">SELANGOR</option>
                <option value="PERAK">PERAK</option>
                <option value="KEDAH">KEDAH</option>
                <option value="PULAU PINANG">PULAU PINANG</option>
                <option value="PERLIS">PERLIS</option>
                <option value="KELANTAN">KELANTAN</option>
                <option value="PAHANG">PAHANG</option>
                <option value="TERENGGANU">TERENGGANU</option>
                <option value="SABAH">SABAH</option>
                <option value="SARAWAK">SARAWAK</option>
                <option value="WP KUALA LUMPUR">WP KUALA LUMPUR</option>
                <option value="WP LABUAN">WP LABUAN</option>
                <option value="WP PUTRAJAYA">WP PUTRAJAYA</option>
              </select>
            ) : (
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            )}
          </div>
          
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email <small className="text-xs text-gray-500 italic">(Email)</small></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <p className="text-xs text-gray-500 italic">*Please enter your active email to receive invoices, receipts, seminar tickets and Zoom links</p>
        </div>

        <div>
          <label htmlFor="telephoneNumber" className="block text-sm font-medium text-gray-700">No Telefon <small className="text-xs text-gray-500 italic">(Telephone Number)</small></label>
          <input
            type="tel"
            id="telephoneNumber"
            name="telephoneNumber"
            value={formData.telephoneNumber}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Kategori <small className="text-xs text-gray-500 italic">(Category)</small></label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Pilih Kategori</option>
            <option value="With HRDC - Physical">With HRDC - Physical</option>
            <option value="With HRDC - Online">With HRDC - Online</option>
            <option value="Without HRDC - Physical">Without HRDC - Physical</option>
            <option value="Without HRDC - Online">Without HRDC - Online</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'Registering...' : 'Daftar/ Register'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
