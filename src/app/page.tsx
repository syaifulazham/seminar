import Link from 'next/link';
import styles from './page.module.css';
import Image from 'next/image';
import jata from '@/lib/images/jata.png';
import kesuma from '@/lib/images/kesuma.png';
import workers from '@/lib/images/workers.png';
import { FaEarlybirds } from "react-icons/fa6";

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
          <h2 className={styles.categoryTitle}>Dengan HRDC</h2>
          <div className={styles.subcategories}>
            <div className={styles.subcategory}>
              <h3>Fizikal</h3>
              <p>Terokai seminar yang dijalankan secara fizikal dengan kelulusan HRDC.</p>
              <div className={styles.early_bird_container}>
                <FaEarlybirds className="text-4xl" />
                Harga Early Bird!! <span className={styles.price}>RM650</span> Sehingga 8 Oktober 2024
                <span className={styles.normal_price_container}>Harga Normal RM850</span>
              </div>
              <Link href="/register?type=physical&category=withHRDC" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sertai
              </Link>
            </div>
            <div className={styles.subcategory}>
              <h3>Atas Talian (Zoom Meeting)</h3>
              <p>Sertai seminar dalam talian dengan pensijilan dari HRDC.</p>
              <div className={styles.early_bird_container}>
                <FaEarlybirds className="text-4xl" />
                Harga Early Bird!! <span className={styles.price}>RM650</span> Sehingga 8 Oktober 2024
                <span className={styles.normal_price_container}>Harga Normal RM850</span>
              </div>
              <Link href="/register?type=online&category=withHRDC" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sertai
              </Link>
            </div>
          </div>
        </div>

        {/* Without HRDC Section */}
        <div className={styles.categoryCard}>
          <h2 className={styles.categoryTitle}>Tanpa HRDC</h2>
          <div className={styles.subcategories}>
            <div className={styles.subcategory}>
              <h3>Fizikal</h3>
              <p>Sertai seminar secara fizikal tanpa afiliasi HRDC.</p>
              <div className={styles.early_bird_container}>
                <FaEarlybirds className="text-4xl" />
                Harga Early Bird!! <span className={styles.price}>RM500</span> Sehingga 8 Oktober 2024
                <span className={styles.normal_price_container}>Harga Normal RM650</span>
              </div>
              <Link href="/register?type=physical&category=withoutHRDC" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sertai
              </Link>
            </div>
            <div className={styles.subcategory}>
              <h3>Atas Talian (Zoom Meeting)</h3>
              <p>Sertai kami dalam talian melalui Zoom Meeting tanpa HRDC.</p>
              <div className={styles.early_bird_container}>
                <FaEarlybirds className="text-4xl" />
                Harga Early Bird!! <span className={styles.price}>RM500</span> Sehingga 8 Oktober 2024
                <span className={styles.normal_price_container}>Harga Normal RM650</span>
              </div>
              <Link href="/register?type=online&category=withoutHRDC" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sertai
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
