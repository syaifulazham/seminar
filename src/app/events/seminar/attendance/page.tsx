'use client';

import { useState, useEffect, useRef } from 'react';
import { Participant } from '@prisma/client';
import karnival from '@/lib/images/karnival.png';
import Image from 'next/image';

export default function SeminarAttendance() {
    const [inputValue, setInputValue] = useState('');
    const [participant, setParticipant] = useState<Participant | null>(null);
    const [attendanceCount, setAttendanceCount] = useState(0);
    const [massage, setMassage] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>('27-10-2024'); // Default selected date

    useEffect(() => {
        // Focus on the input when component mounts if it's not disabled
        if (inputRef.current && !isDisabled) {
            inputRef.current.focus();
            setIsFocused(true);
        }
    }, [isDisabled]);

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);

        if (e.target.value && e.target.value.length >= 64) {
            setIsDisabled(true); // Disable input

            // Timeout to re-enable input after 3 seconds
            setTimeout(() => {
                setIsDisabled(false);
                if (inputRef.current) inputRef.current.focus(); // Refocus the input after enabling
            }, 3000);

            // Send request to record attendance
            const res = await fetch('/api/attendance/record', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ qrCode: e.target.value }),
            });

            const data = await res.json();
            if (data.success) {
                setParticipant(data.participant);
                setAttendanceCount(data.currentAttendance);
                setInputValue(''); // Reset input value
                setMassage('');
            } else {
                setMassage('Participant not found');
                setParticipant(data.participant);
                setInputValue(''); // Reset input value
                setMassage('');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center w-full">
            <div className="flex flex-col justify-center items-center">
                <Image src={karnival} alt="Karnival" className="h-[300px] w-[500px]" />
            </div>
            <div className="bg-white shadow-md rounded-lg p-8 max-w-xl w-full h-[500px]">
                {/* Display attendance count */}
                <div className="absolute bottom-0 left-0 m-4 flex flex-col justify-center items-center text-lg font-medium text-gray-700">
                    <div className="p-0 m-0 space-y-0">Kehadiran</div>
                    <div className="text-sm text-gray-500 space-y-0">{selectedDate}</div>
                    <span className="text-blue-600 text-4xl">{attendanceCount}</span>
                    <div className="text-center">
                        <p>{isFocused ? 'Ready' : 'Standby'}</p>
                    </div>
                </div>

                {/* Date Toggle Buttons */}
                <div className="flex justify-center space-x-4 mb-6">
                    <button
                        className={`px-4 py-2 rounded ${selectedDate === '26-10-2024' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setSelectedDate('26-10-2024')}
                    >
                        26-10-2024
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${selectedDate === '27-10-2024' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setSelectedDate('27-10-2024')}
                    >
                        27-10-2024
                    </button>
                </div>

                {/* Display participant info when available */}
                <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">Kehadiran Seminar</h1>
                <h3 className="text-lg font-semibold mb-6 text-center text-gray-800">Sila imbas QR Code anda untuk kehadiran</h3>

                {participant && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <h2 className="text-3xl font-semibold mb-2 text-gray-700 text-center">Selamat Datang</h2>

                        {/* Grid layout for participant details */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 text-center border-b border-solid border-gray-300">
                                <p className="text-2xl font-bold text-blue-500">{participant.name}</p>
                            </div>
                            <div className="col-span-2 text-center border-b border-solid border-gray-300">
                                <p className="text-gray-700">{participant.department}</p>
                            </div>
                            <div className="text-center border-r border-solid border-gray-300">
                                <p className="text-gray-700">{participant.town}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-700">{participant.state}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-gray-700">{participant.category}</p>
                            </div>
                        </div>
                    </div>
                )}

                {massage && (
                    <div className="bg-red-500 p-4 rounded-lg mb-6">
                        <p className="text-white">{massage}</p>
                    </div>
                )}

                {/* Invisible text input for QR Code Reader */}
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="absolute opacity-0 pointer-events-none"
                    aria-hidden="true"
                    autoFocus
                    disabled={isDisabled} // Disable input when isDisabled is true
                    onBlur={() => inputRef.current?.focus()}
                />
            </div>
        </div>
    );
}
