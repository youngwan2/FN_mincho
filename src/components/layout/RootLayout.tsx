import Header from './Header';
import { Outlet } from "react-router";


export default function RootLayout() {
    return (
        <div className='max-w-[1240px] mx-auto h-auto' >
            <Header/>
            <main className='h-full w-full'>
                <Outlet />
            </main>
            <footer>
                &copy; {new Date().getFullYear()} Mincho
            </footer>
        </div>
    )
}