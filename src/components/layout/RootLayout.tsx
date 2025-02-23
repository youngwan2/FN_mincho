import Header from './Header';
import { Outlet } from "react-router";
import { ToastContainer } from 'react-toastify';

export default function RootLayout() {
    return (
        <div className='max-w-[1240px] mx-auto h-auto font-prentendard px-10' >
            <ToastContainer className={"z-[10000000000000000000000]"} />
            <Header />

            <main className='h-auto w-full'>
                <Outlet />
            </main>
            <footer>
                &copy; {new Date().getFullYear()} Mincho
            </footer>
        </div>
    )
}