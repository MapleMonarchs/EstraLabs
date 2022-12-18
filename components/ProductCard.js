import Image from "next/image";
import Link from "next/link";
import styles from "./card.module.css";

export default function ProductCard({href, imgsrc, name, type}) {
    return (
        <div className={styles.card}>
            <Link href={href} style={{ textDecoration: 'none' }}>
                <Image
                src={imgsrc} 
                height={113}
                width={150}
                alt={name} 
                className={styles.productImage}
                />
                <div className={styles.productDesc}>
                    <h1 style={{ marginBottom: 0 }}>{name}</h1>
                    <h2 style={{ marginTop: 0 }}>{type}</h2>
                </div>
            </Link>
        </div>
    );
}