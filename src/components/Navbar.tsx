import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { GrSchedules } from "react-icons/gr";
import { FaChalkboardTeacher } from "react-icons/fa";
import Image from 'next/image';
import jata from '@/lib/images/jatahq.png';
import React from 'react';

export const Navbar = ({ active }: { active: string }) => {
    return (
        <div className="flex flex-col w-full justify-center items-center">
            <Image src={jata} alt="Logo 1" height={80} />
            <div className="flex flex-row items-center justify-center mb-4 gap-10 p-4 w-full border-b border-white border-dashed" style={{ borderRadius: '35px' }}>
                <div className={`flex flex-row items-center gap-2 border border-white px-2 py-2 text-white text-sm hover:bg-white hover:text-black md:pl-0 md:pr-4 md:py-0 ${active === 'home' ? 'bg-[#0078D7]' : ''}`} style={{ borderRadius: '35px' }}>
                    <Link href="/" className="flex flex-row items-center gap-2">
                        <div className="bg-[#0078D7] text-white rounded-full p-2 text-2xl"><IoHome /></div> <span className="hidden md:block text-sm ">UTAMA</span>
                    </Link>
                </div>
                <div className={`flex flex-row items-center gap-2 border border-white px-2 py-2 text-white text-sm hover:bg-white hover:text-black md:pl-0 md:pr-4 md:py-0 ${active === 'tentatives' ? 'bg-[#0078D7]' : ''}`} style={{ borderRadius: '35px' }}>
                    <Link href="/tentatives" className="flex flex-row items-center gap-2">
                        <div className="bg-[#0078D7] text-white rounded-full p-2 text-2xl"><GrSchedules /></div> <span className="hidden md:block text-sm ">TENTATIF</span>
                    </Link>
                </div>
                <div className={`flex flex-row items-center gap-2 border border-white px-2 py-2 text-white text-sm hover:bg-white hover:text-black md:pl-0 md:pr-4 md:py-0 ${active === 'programs' ? 'bg-[#0078D7]' : ''}`} style={{ borderRadius: '35px' }}>
                    <Link href="/programs" className="flex flex-row items-center gap-2">
                        <div className="bg-[#0078D7] text-white rounded-full p-2 text-2xl"><FaChalkboardTeacher /></div> <span className="hidden md:block text-sm ">PROGRAM</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};