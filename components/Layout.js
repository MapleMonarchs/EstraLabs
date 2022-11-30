import Header from './Header'
import Head from 'next/head';
import Image from "next/image";
import styles from './layout.module.css'

export default function Layout({ children }) {
    return (
        <div className={styles.back}>
            <Head>
                <link rel="shortcut icon" 
                href="https://maplemonarchs.github.io/EstraLabs/images/favicon.ico"/>

                {/*OGP for Twitter */}
                <meta name="twitter:card" content="summary_large_image"></meta>
                <meta property="twitter:title" content="EstraLabs" />
                <meta property="twitter:description" content="uwu" />
                <meta property='twitter:url' content='https://maplemonarchs.github.io/EstraLabs' />
                <meta property="twitter:image" content="https://maplemonarchs.github.io/EstraLabs/images/EstraLabs1-1.png" />

                {/* general purpose OGP for WhatsApp & co*/}
                <meta property="og:type" content="Website"/>
                <meta property="og:title" content="EstraLabs" />
                <meta property="og:description" content="uwu" />
                <meta property='og:url' content='https://maplemonarchs.github.io/EstraLabs' />
                <meta property="og:image" content="https://maplemonarchs.github.io/EstraLabs/images/EstraLabs1-1.png" />
                <meta property="og:image" content="https://maplemonarchs.github.io/EstraLabs/images/EstraLabs1-1small.png" />

                
            </Head>
            <div>
                <Header/>
            </div>
            {children}

            <footer>
                <p className={styles.copyright}>&copy;{new Date().getFullYear()} EstraLabs</p>
                <Image 
                        src="https://inconspicuousbucket.s3.us-west-2.amazonaws.com/e2v2.gif" 
                        height={62}
                        width={162}
                        alt="Estrogen" 
                        className={styles.estrogen}
                    />
            </footer>
        </div>
    )
} 