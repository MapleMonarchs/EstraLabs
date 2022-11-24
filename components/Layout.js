import Header from './Header'
import Head from 'next/head';
import styles from './layout.module.css'

export default function Layout({ children }) {
    return (
        <div className={styles.back}>
            <Head>
                <link rel="shortcut icon" 
                href="https://maplemonarchs.github.io/EstraLabs/images/favicon.ico"/>
            </Head>
            <div>
                <Header/>
            </div>
            {children}

            <footer>
                <p className={styles.copyright}>&copy;{new Date().getFullYear()} EstraLabs</p>
            </footer>
        </div>
    )
} 