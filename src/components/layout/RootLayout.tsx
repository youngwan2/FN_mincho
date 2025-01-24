import styles from './RootLayout.module.css'
import { Outlet } from "react-router";


export default function RootLayout() {
    return (
        <div className={styles['root-layout']}>
            <header className={styles['header']}>
                <h1>Mincho</h1>
            </header>
            <main className={styles['main']}>
                <Outlet />
            </main>
            <footer className={styles['footer']}>
                &copy; {new Date().getFullYear()} Mincho
            </footer>
        </div>
    )
}