import styles from '../page.module.css';
import Image from 'next/image';
import { Navbar } from "@/components/Navbar";
import React from 'react';
import TentativeSchedule from '@/components/TentativeSchedule';

const tentatif = [
    {
      label: "Hari Pertama (26 Oktober 2024 - Sabtu)",
      jadual: [
        { id: 1, masa: "8.00 pagi", perkara: ["Pendaftaran Peserta dan Sarapan Pagi"] },
        { id: 2, masa: "9.00 pagi", perkara: ["Taklimat KKP & Program"] },
        { id: 3, masa: "9.15 pagi", perkara: ["Pembentangan 1: Cabaran Kesihatan Mental di Malaysia", "Pembentang: Kementerian Kesihatan Malaysia (KKM)"] },
        { id: 4, masa: "10.00 pagi", perkara: ["Senaman X-Break & Kuiz KKP Sesi 1"] },
        { id: 5, masa: "10.15 pagi", perkara: ["Pembentangan 2: Sinopsis Garis Panduan Pentaksiran dan Pengurusan Risiko Psikososial di Tempat Kerja (PRisMA) 2024", "Pembentang UiTM"] },
        { id: 6, masa: "11.00 pagi", perkara: ["Rehat & Minum Pagi"] },
        { id: 7, masa: "11.30", perkara: ["Kuiz KKP Sesi 2"] },
        { id: 8, masa: "11.30 pagi", perkara: ["MAJLIS PERASMIAN KARNIVAL KESIHATAN PEKERJAAN KESUMA MADANI PERINGKAT KEBANGSAAN 2024"] },
        { id: 9, masa: "01.00 petang", perkara: ["Sidang Media KKP", "Rehat & Makan Tengah Hari"] },
        { id: 10, masa: "2.30 petang", perkara: ["Pembentangan 3: Pengenalan Berdasarkan Kajian Pembangunan Garis Panduan Pentaksiran dan Pengurusan Risiko Psikososial di Tempat Kerja", "Pembentang: UiTM"] },
        { id: 11, masa: "3.15 petang", perkara: ["Senaman X-Break & Kuiz KKP Sesi 3"] },
        { id: 12, masa: "3.45 petang", perkara: ["Pembentangan 4: Pentaksiran Risiko Psikososial Di Tempat Kerja (PRisMA)", "Pembentang: UiTM"] },
        { id: 13, masa: "4.30 petang", perkara: ["Kuiz KKP Sesi 4 & Minum Petang"] },
        { id: 14, masa: "5.00 petang", perkara: ["Bersurai"] }
      ]
    },
    {
      label: "Hari Kedua (27 Oktober 2024 - Sabtu)",
      jadual: [
        { id: 1, masa: "8.00 pagi", perkara: ["Pendaftaran Peserta dan Sarapan Pagi"] },
        { id: 2, masa: "9.00 pagi", perkara: ["Taklimat KKP & Program"] },
        { id: 3, masa: "9.15 pagi", perkara: ["Pembentangan 5: Pengurusan Risiko Psikososial Di Tempat Kerja", "Pembentang: UiTM"] },
        { id: 4, masa: "10.00 pagi", perkara: ["Senaman X-Break & Kuiz KKP Sesi 5", "Rehat & Minum Pagi"] },
        { id: 5, masa: "10.30 pagi", perkara: ["Pembentangan 6: Aplikasi Garis Panduan Pentaksiran dan Pengurusan Risiko Psikososial di Tempat Kerja", "Pembentang UiTM"] },
        { id: 6, masa: "11.15 pagi", perkara: ["Kuiz KKP Sesi 6 & Rehat"] },
        { id: 7, masa: "11.45 pagi", perkara: ["Pembentangan 7: Psychological First Aid Programme", "Pembentang: NIOSH Malaysia"] },
        { id: 8, masa: "12.30 petang", perkara: ["Rehat & Makan Tengah Hari"] },
        { id: 9, masa: "2.30 petang", perkara: ["Pembentangan 8: Perkongsian Pengurusan Kesihatan Mental di Industri", "Pembentang: Wakil Industri"] },
        { id: 10, masa: "3.15 petang", perkara: ["Senaman X-Break & Kuiz KKP Sesi 7"] },
        { id: 11, masa: "3.45 petang", perkara: ["Pembentangan 9: Pengurusan Penyakit Psikososial Di Tempat Kerja", "Pembentang UiTM"] },
        { id: 12, masa: "4.30 petang", perkara: ["Kuiz KKP Sesi 8", "Pengisian Maklumbalas Program", "Minum Petang"] },
        { id: 13, masa: "5.00 petang", perkara: ["Bersurai"] }
      ]
    }
  ];

const tentatives = () => {
    return (
        <div className={styles.container}>
            <Navbar active="tentatives" />

            {/* Heading */}
            <h1 className={styles.headingPeringkat}>JADUAL TENTATIF KARNIVAL KESIHATAN PEKERJAAN KESUMA MADANI PERINGKAT KEBANGSAAN 2024</h1>
            <TentativeSchedule tentatif={tentatif} />
        </div>
    )
}

export default tentatives;