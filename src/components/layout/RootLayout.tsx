import Header from './Header';
import { Outlet } from "react-router";
import { ToastContainer } from 'react-toastify';

export default function RootLayout() {
    return (
        <div className='max-w-[1240px] mx-auto h-auto relative' >
            <Header />
            <ToastContainer className={"z-[10000000000000000000000]"}/>
            <main className='h-full w-full  relative'>
                <Outlet />
            </main>
            <footer>
                &copy; {new Date().getFullYear()} Mincho
            </footer>
        </div>
    )
}