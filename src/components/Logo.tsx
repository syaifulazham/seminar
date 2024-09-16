"use client"
import Image from 'next/image';

import ncosh from "@/lib/images/ncosh.png";
import osh from "@/lib/images/oshmp25.png";
import madani from "@/lib/images/madani.png";
import jkkpwpkl from "@/lib/images/jkkp-wpkl.png";

export const LogoGroup = () => {
    return (
        <div className="flex flex-row items-center justify-center py-1 text-white gap-4 bg-white w-full">
            <Image src={jkkpwpkl} alt="jkkp-wpkl"  height={45} />
            <Image src={osh} alt="oshmp25"  height={65} />
            <Image src={ncosh} alt="ncosh" height={55} />
            <Image src={madani} alt="madani" height={45} />
        </div>
    );
};
