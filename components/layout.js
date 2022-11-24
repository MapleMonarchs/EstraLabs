import Header from './Header'
import styles from './layout.module.css'

export default function Layout({ children }) {
    return (
        <div className={styles.back}>
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