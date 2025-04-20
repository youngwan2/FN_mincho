import { CustomToastContainer } from '../toast/CustomToast';
import Header from './Header';
import { Outlet } from "react-router";

export default function RootLayout() {
    return (
        <div>
            <div className='md:px-10 px-5 max-w-[1240px] mx-auto h-auto font-prentendard' >
                <CustomToastContainer/>
                <Header />

                <main className='h-auto w-full'>
                    <Outlet />
                </main>

            </div>

            <footer className="bg-[#05D182] text-white py-6 mt-30 h-60">
                <div className="container mx-auto text-center pt-15">
                    <p className="text-2xl">
                        &copy; {new Date().getFullYear()} Mincho
                    </p>
                    <p className="text-xl mt-2">
                        자연과 함께 성장하는 커뮤니티
                    </p>
                </div>
            </footer>
        </div>
    )
}