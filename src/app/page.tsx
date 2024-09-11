import Link from 'next/link';
import styles from './page.module.css';
import Image from 'next/image';
import jata from '@/lib/images/jata.png';
import kesuma from '@/lib/images/kesuma.png';
import workers from '@/lib/images/workers.png';

const Home = () => {
  return (
    <div className={styles.container}>
      {/* Top Logos */}
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
          <Image src={jata} alt="Logo 1" width={110} height={110} />
        </div>
        <div className={styles.logo}>
          <Image src={kesuma} alt="Logo 2" width={80} height={80} />
        </div>
      </div>

      {/* Heading */}
      <h1 className={styles.heading}>SEMINAR & MAJLIS PERASMIAN GARIS PANDUAN PRISMA DI TEMPAT KERJA 2024</h1>
      <h1 className={styles.motto}>Kerja Selamat, Minda Sejahtera</h1>

      <div className={styles.schedule_container}>
      <Image src={workers} alt="Logo 1" width={500} />
      <div className={styles.schedule}>
            <div className={styles.grid_item_colspan_2}>26 OKTOBER 2024</div>
            <div className={styles.grid_item_colspan_2}>27 OKTOBER 2024</div>
            <div className={styles.item} >Majlis Perasmian Garis Panduan Pentaksiran dan Pengurusan Risiko Psikososial Pekerjaan di Tempat Kerja 2024</div>
            <div className={styles.item}>Sinopsis Garis Panduan Pentaksiran dan Pengurusan Risiko Psikososial Pekerjaan di Tempat Kerja (PRisMA) 2024</div>
            <div className={styles.item}>Pengurusan Risiko Psikososial Pekerjaan di Tempat Kerja</div>
            <div className={styles.item}>Aplikasi Garispanduan Pentaksiran dan Pengurusan Risiko Psikososial Pekerjaan di Tempat Kerja</div>
            <div className={styles.item}>Cabaran Kesihatan Mental di Malaysia</div>
            <div className={styles.item}>Pentaksiran Risiko Psikososial Pekerjaan di Tempat Kerja (PRisMA)</div>
            <div className={styles.item}>Psychological First Aid Programme</div>
            <div className={styles.item}>Perkongsian Pengurusan Kesihatan Mental di Industri</div>
            <div className={styles.grid_item_colspan_2}>Pengenalan Berdasarkan Kajian Pembangunan Garis Panduan Pentaksiran dan Pengurusan Psikososial di Tempat Kerja</div>
            <div className={styles.grid_item_colspan_2}>Pengurusan Penyakit Psikososial di Tempat Kerja</div>
          </div>
      </div>

      {/* Categories Section */}
      <div className={styles.categories}>
        {/* With HRDC Section */}
        <div className={styles.categoryCard}>
          <h2 className={styles.categoryTitle}>With HRDC</h2>
          <div className={styles.subcategories}>
            <div className={styles.subcategory}>
              <h3>Physical</h3>
              <p>Explore seminars conducted physically with HRDC approval.</p>
            </div>
            <div className={styles.subcategory}>
              <h3>Online</h3>
              <p>Attend online seminars with HRDC certification.</p>
            </div>
          </div>
        </div>

        {/* Without HRDC Section */}
        <div className={styles.categoryCard}>
          <h2 className={styles.categoryTitle}>Without HRDC</h2>
          <div className={styles.subcategories}>
            <div className={styles.subcategory}>
              <h3>Physical</h3>
              <p>Join in-person seminars without HRDC affiliation.</p>
            </div>
            <div className={styles.subcategory}>
              <h3>Online</h3>
              <p>Participate in various online seminars without HRDC requirements.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
