
import styles from '../page.module.css';
import Image from 'next/image';
import { Navbar } from "@/components/Navbar";
import React from 'react';

const programs = () => {
    return (
        <div className={styles.container}>
            <Navbar active="programs" />

            {/* Heading */}
            <h1 className={styles.headingPeringkat}>PELBAGAI PROGRAM SEPANJANG KARNIVAL</h1>
        </div>
    )
}

export default programs;