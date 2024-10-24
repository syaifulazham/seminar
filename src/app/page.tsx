import Link from 'next/link';
import dynamic from 'next/dynamic';
import styles from './page.module.css';
import Image from 'next/image';
import jata from '@/lib/images/jatahq.png';
import kesuma from '@/lib/images/kesuma.png';
import karnival from '@/lib/images/karnival.png';
import workers from '@/lib/images/workers-v4.png';
import { FaEarlybirds } from "react-icons/fa6";
import { AiFillSchedule, AiFillVideoCamera } from "react-icons/ai";
import { LogoPanel } from "@/components/Logo";
import { Navbar } from "@/components/Navbar";

const SimpleMap = dynamic(() => import('../components/SimpleMap'), {
  ssr: false, // Disable server-side rendering
});


const Home = () => {
  return (
    <div className={styles.container}>

      <Navbar active="home" />
      {/* Heading */}
      {/*
      <h1 className={styles.heading}>KARNIVAL KESIHATAN PEKERJAAN </h1>
      <h1 className={styles.headingMadani}>KESUMA MADANI </h1>
      <h1 className={styles.headingPeringkat}>PERINGKAT KEBANGSAAN 2024</h1>
      <h1 className={styles.motto}>Pekerja Sihat, Minda Sejahtera</h1>
      */}

      <div className={styles.schedule_container}>
        <Image src={karnival} alt="Logo 1" width={500} />
        <Image src={workers} alt="Logo 1" width={700} />
        {/* <LogoGroup /> */}
        <LogoPanel />
        
        <div className="flex flex-col items-center justify-center mb-2 gap-10 p-4 w-full border-b border-white border-dashed" style={{ borderRadius: '35px' }}>
          <h1 className={styles.headingSection}>TARIKH & LOKASI</h1>
          
        </div>
        <div className="flex flex-col items-center justify-center mb-2 gap-10 p-4 w-full  md:flex-row" >
          <div>
            <h1 className={styles.heading2}>
              BERTEMPAT DI <br />
              <span className={styles.headingMadani2}>
                SETIA CITY CONVENTION CENTER SHAH ALAM, SELANGOR
              </span>
              <br /><br />
              PADA 
              <br />
              <span className={styles.headingMadani2}>
                26 HINGGA 27 OKTOBER 2024
              </span>
            </h1>
          </div>
          <SimpleMap />
        </div>
        

        <div className="flex flex-col items-center justify-center mb-2 gap-10 p-4 w-full border-b border-white border-dashed" style={{ borderRadius: '35px' }}>
          <h1 className={styles.headingSection}>TAJUK-TAJUK UTAMA PEMBENTANGAN <br />
            <span className='text-sm'>*Semakan jadual tentatif boleh dibuat pada pautan <Link href="/tentatives" className='border border-white rounded-lg px-2 py-1'>Tentatif</Link></span>
          </h1>
        </div>

        <div className={styles.schedule_wrapper}>
          <div className={styles.schedule}>
            <div className={styles.grid_item_colspan_2_header}>26 OKTOBER 2024</div>
            <div className={styles.item} ><AiFillSchedule className="text-2xl" />Majlis Perasmian Garis Panduan Pentaksiran dan Pengurusan Risiko Psikososial Pekerjaan di Tempat Kerja 2024</div>
            <div className={styles.item} ><AiFillSchedule className="text-2xl" />Sinopsis Garis Panduan Pentaksiran dan Pengurusan Risiko Psikososial Pekerjaan di Tempat Kerja (PRisMA) 2024</div>

            <div className={styles.item} ><AiFillSchedule className="text-2xl" />Cabaran Kesihatan Mental di Malaysia</div>
            <div className={styles.item} ><AiFillSchedule className="text-2xl" />Pentaksiran Risiko Psikososial Pekerjaan di Tempat Kerja (PRisMA)</div>

            <div className={styles.grid_item_colspan_2}><AiFillSchedule className="text-2xl" />Pengenalan Berdasarkan Kajian Pembangunan Garis Panduan Pentaksiran dan Pengurusan Psikososial di Tempat Kerja</div>

          </div>

          <div className={styles.schedule}>
            <div className={styles.grid_item_colspan_2_header}>27 OKTOBER 2024</div>

            <div className={styles.item} ><AiFillSchedule className="text-2xl" />Pengurusan Risiko Psikososial Pekerjaan di Tempat Kerja</div>
            <div className={styles.item} ><AiFillSchedule className="text-2xl" />Aplikasi Garispanduan Pentaksiran dan Pengurusan Risiko Psikososial Pekerjaan di Tempat Kerja</div>

            <div className={styles.item} ><AiFillSchedule className="text-2xl" />Psychological First Aid Programme</div>
            <div className={styles.item} ><AiFillSchedule className="text-2xl" />Perkongsian Pengurusan Kesihatan Mental di Industri</div>

            <div className={styles.grid_item_colspan_2}><AiFillSchedule className="text-2xl" />Pengurusan Penyakit Psikososial di Tempat Kerja</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mb-2 gap-10 p-4 w-full border-b border-white border-dashed" style={{ borderRadius: '35px' }}>
        <h1 className={styles.headingSection}>
          PAKEJ SEMINAR
        </h1>
      </div>
      {/* Categories Section */}
      <div className={styles.categories}>
        {/* With HRDC Section */}
        <div className={styles.categoryCard}>
          <h2 className={styles.categoryTitle + " " + styles.early_bird_end}>PAKEJ HRDC</h2>
          <div className={styles.subcategories}>
            <div className={styles.subcategory}>
              <h3>Fizikal</h3>

              <div className={styles.early_bird_container_end}>
                <FaEarlybirds className="text-4xl" />
                Harga Early Bird!! <span className={styles.price + " " + styles.early_bird_end}>RM650</span> <span className={styles.early_bird_end}>Sehingga 15 Oktober 2024</span>
                <span className={styles.normal_price_container}>Harga Normal RM800</span>
              </div>
              {/*}
              <a href="#" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" disabled>
                Sertai
              </a>
              */}
            </div>
            <div className={styles.subcategory}>
              <h3>Atas Talian</h3>
              <h2 className={styles.zoom_meeting_label}><span className={styles.iconContainer}><AiFillVideoCamera /></span>Zoom Meeting</h2>

              <div className={styles.early_bird_container_end}>
                <FaEarlybirds className="text-4xl" />
                Harga Early Bird!! <span className={styles.price + " " + styles.early_bird_end}>RM650</span> <span className={styles.early_bird_end}>Sehingga 15 Oktober 2024</span>
                <span className={styles.normal_price_container}>Harga Normal RM800</span>
              </div>
              {/*
              <Link href="#" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sertai
              </Link>
              */}
            </div>
          </div>
        </div>

        {/* Without HRDC Section */}
        <div className={styles.categoryCard}>
          <h2 className={styles.categoryTitle}>PAKEJ BIASA</h2>
          <div className={styles.subcategories}>
            <div className={styles.subcategory}>
              <h3>Fizikal</h3>

              <div className={styles.early_bird_container_end}>
                <FaEarlybirds className="text-4xl" />
                Harga Early Bird!! <span className={styles.price + " " + styles.early_bird_end}>RM500</span> <span className={styles.early_bird_end}>Sehingga 15 Oktober 2024</span>
                <span className={styles.normal_price_container}>Harga Normal RM650</span>
              </div>
              {/*
              <Link href="/register?type=physical&category=withoutHRDC" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sertai
              </Link>
              */}
            </div>
            <div className={styles.subcategory}>
              <h3>Atas Talian</h3>
              <h2 className={styles.zoom_meeting_label}><span className={styles.iconContainer}><AiFillVideoCamera /></span>Zoom Meeting</h2>

              <div className={styles.early_bird_container}>
                <FaEarlybirds className="text-4xl" />
                Harga Early Bird!! <span className={styles.price + " " + styles.early_bird_end}>RM500</span> <span className={styles.early_bird_end}>Sehingga 15 Oktober 2024</span>
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
