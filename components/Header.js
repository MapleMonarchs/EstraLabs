import Link from "next/link";
import Image from "next/image";
import styles from './header.module.css';

export default function Header() {

    return (
        <div>
            <div className={styles.headerHeadline}>
                <Link href="/">
                    <Image 
                        src="https://maplemonarchs.github.io/EstraLabs/images/EstraLabs11-1.png" 
                        height={80}
                        width={220}
                        alt="Estra Labs" 
                    />
                </Link>
            </div>
        </div>
    );
}