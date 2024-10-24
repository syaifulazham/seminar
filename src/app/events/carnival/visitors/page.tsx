'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Import the cookie handling library
import { countries } from '@/lib/data'; // Import countries data
import karnival from '@/lib/images/karnival.png'
import Image from 'next/image';

const states = [
    'JOHOR', 'MELAKA', 'NEGERI SEMBILAN', 'SELANGOR', 'PERAK', 'KEDAH',
    'PULAU PINANG', 'PERLIS', 'KELANTAN', 'PAHANG', 'TERENGGANU',
    'SABAH', 'SARAWAK', 'WP KUALA LUMPUR', 'WP LABUAN', 'WP PUTRAJAYA'
];

const organisasi = ['Kerajaan', 'Swasta', 'Not-Profit', 'Individu Persendirian'];

const bidangPekerjaan = ['IT', 'Pendidikan', 'Kesihatan', 'Kewangan','Pertanian', 'Perkhidmatan', 'Kejuruteraan', 'Pertahanan/ Keselamatan', 'Lain-lain'];

export default function CarnivalVisitors() {
    const [country, setCountry] = useState('Malaysia');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        organizationType: '',
        occupationField: '',
        gender: 'Lelaki',
        yearOfBirth: '',
        state: '',
        country: 'Malaysia',
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    // Check if the cookie exists on load
    useEffect(() => {
        const hasSubmitted = Cookies.get('visitorFormSubmitted');
        if (hasSubmitted) {
            setIsSubmitted(true);
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedFormData = {
            ...formData,
            yearOfBirth: parseInt(formData.yearOfBirth, 10),
        };

        const res = await fetch('/api/visitors/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedFormData),
        });

        const data = await res.json();
        if (data.success) {
            // Set the cookie for form submission
            Cookies.set('visitorFormSubmitted', 'true', { expires: 365 }); // Set cookie to expire in 1 year
            setIsSubmitted(true);
            //alert('Visitor information saved successfully!');
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full text-center">
                    <h1 className="text-2xl font-semibold mb-6 text-gray-800">Terima kasih</h1>
                    <p className="text-lg text-gray-700">Terima kasih, anda telah pun mengisi log lawatan. Terima kasih.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <Image src={karnival} alt="karnival" width={350} height={350} />
            <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full">
                <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">Buku Log Lawatan</h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name - Full Row */}
                    <div className="col-span-1 md:col-span-2">
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Nama"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <input
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="Nombor Telefon"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Organization Type */}
                    <div>
                        <select
                            name="organizationType"
                            value={formData.organizationType}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        >
                            <option value="">Jenis Organisasi</option>
                            {organisasi.map((org) => (
                                <option key={org} value={org}>
                                    {org}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Occupation Field */}
                    <div>
                        <select
                            name="occupationField"
                            value={formData.occupationField}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        >
                            <option value="">Bidang Pekerjaan</option>
                            {bidangPekerjaan.map((bidang) => (
                                <option key={bidang} value={bidang}>
                                    {bidang}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Gender */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Lelaki"
                                    checked={formData.gender === 'Lelaki'}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                Lelaki
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Perempuan"
                                    checked={formData.gender === 'Perempuan'}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                Perempuan
                            </label>
                        </div>
                    </div>

                    {/* Year of Birth */}
                    <div>
                        <select
                            name="yearOfBirth"
                            value={formData.yearOfBirth}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        >
                            <option value="">Tahun Lahir</option>
                            {Array.from({ length: 2024 - 1940 + 1 }, (_, i) => 1940 + i).map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Country */}
                    <div>
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        >
                            <option value="">Select Country</option>
                            {countries.map((country) => (
                                <option key={country.code} value={country.name}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div>


                    {/* State */}
                    {formData.country === 'Malaysia' && (
                    <div>
                        <select
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        >
                            <option value="">Negeri</option>
                            {states.map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="col-span-1 md:col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
