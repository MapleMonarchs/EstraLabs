import Link from "next/link";
import Image from "next/image";
import styles from './header.module.css';
import Dropdown from "./Dropdown";

export default function Header() {

    const items = [
        {
            label: "January",
            value: "january"
        },
        {
            label: "February",
            value: "february"
        },
        {
            label: "March",
            value: "march"
        },
    ];

    return (
        <div>
            <div class={styles.headerHeadline}>
                <Link href="/">
                    <Image 
                        src="/images/EstraLabs11-1.png" 
                        height={80}
                        width={220}
                        alt="Estra Labs" 
                    />
                </Link>
            </div>
        </div>
    );
}