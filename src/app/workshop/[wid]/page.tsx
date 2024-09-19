import styles from '../../page.module.css';
import Image from "next/image";
import { Navbar } from "@/components/Navbar";

const theworkshops = {
    "spirometry": {
        "title": "Occupational Respiratory Disorders and Spirometry Workshop",
        "posters": "/posters/spirometry.pdf"
    },
    "firstaid": {
        "title": "Basic Occupational First Aid Course",
        "posters": "/posters/first-aid.jpg"
    },

    "medicalsurveillance": {
        "title": "Medical Surveillance Program Guidelines in the Workplace",
        "posters": "/posters/medical-surveillance.pdf"
    },
    "noiserelated": {
        "title": "Guidelines on Management of Occupational Noise-Related Hearing Disorders (ONRHD)",
        "posters": "/posters/noise-related.pdf"
    },

}



export default function WorkshopPage({ params }: { params: { wid: string } }) {
    return <>
        <div className={styles.container}>
            <Navbar active="workshop" />
            <h1 className={styles.headingPeringkat}>Workshop: {theworkshops[params.wid as keyof typeof theworkshops].title}</h1>
            {theworkshops[params.wid as keyof typeof theworkshops].posters.endsWith('.pdf') ? (
                <embed
                    src={theworkshops[params.wid as keyof typeof theworkshops].posters}
                    type="application/pdf"
                    className="w-full h-screen"
                    title="Workshop Poster"
                />

            ) : (
                <Image
                    src={theworkshops[params.wid as keyof typeof theworkshops].posters}
                    alt="Workshop Poster"
                    className="max-w-[500px]"
                    width={500}
                    height={500}

                />
            )}

        </div>
    </>;
}
