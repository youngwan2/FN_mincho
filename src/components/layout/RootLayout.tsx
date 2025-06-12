import useSSE from '../../hooks/useSSE';
import { CustomToastContainer } from '../toast/CustomToast';
import Header from './Header';
import { Link, Outlet } from "react-router";

export default function RootLayout() {

    useSSE(); // SSE 연결

    return (
        <div className='w-full text-[16px] bg-[#fcfcfc69]'>
            <div className='max-w-[1240px] mx-auto h-auto font-prentendard' >
                <CustomToastContainer />
                <Header />

                <main className='h-auto w-full'>
                    <Outlet />
                </main>

            </div>

            <footer className="bg-[#303740] text-white py-6 mt-30 md:h-auto h-auto">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
                        {/* 회사 정보 */}
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-semibold mb-4">Mincho</h3>
                            <p className="text-xl">
                                자연과 함께 성장하는 커뮤니티
                            </p>
                            <p className="mt-4">
                                &copy; {new Date().getFullYear()} Mincho
                            </p>
                        </div>
                        {/* 필수구비서류 링크 */}
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-semibold mb-4">필수구비서류</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="/legal#terms" className="text-gray-300 hover:text-white transition-colors">
                                        이용약관
                                    </a>
                                </li>
                                <li>
                                    <a href="/legal#privacy" className="text-gray-300 hover:text-white transition-colors">
                                        개인정보처리방침
                                    </a>
                                </li>
                                <li>
                                    <a href="/legal#youth" className="text-gray-300 hover:text-white transition-colors">
                                        청소년보호정책
                                    </a>
                                </li>
                                <li>
                                    <a href="/legal#marketing" className="text-gray-300 hover:text-white transition-colors">
                                        마케팅정보 수집 동의
                                    </a>
                                </li>
                                <li>
                                    <a href="/legal#notice" className="text-gray-300 hover:text-white transition-colors">
                                        법적고지
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* 고객센터 및 지원 */}
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-semibold mb-4">고객지원</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">
                                        자주 묻는 질문
                                    </Link>
                                </li>
                                <li>
                                    <a href='https://forms.gle/ApM2zdG9nonzdiSn7' target='_blank' className="text-gray-300 hover:text-white transition-colors">
                                        문의하기
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}