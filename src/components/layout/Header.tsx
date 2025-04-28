import { Link } from "react-router"; // 오타 수정 반영
import { FiHome, FiBook, FiHeart, FiUsers, FiUser, FiBookmark } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import Profile from "../../pages/Home/components/Profile";
import Logo from "../icon/Logo";
import Notification from "../Notification";

export default function Header() {
    const isLogin = useAuth();


    return (
        <>
            {/* 상단 헤더 */}
            <header className="bg-transparent flex justify-between h-45 items-center px-4">
                <div className="flex items-center bg-[rgba(255,255,255,0.7)] rounded-2xl p-2 py-4">
                    <h1 className="font-bold">
                        <Link to={"/"}>
                            <Logo />
                        </Link>
                    </h1>

                    {/* 데스크탑 전용 네비게이션 */}
                    <nav className="ml-8 hidden md:block ">
                        <ul className="flex">
                            <li className="mx-3 font-bold text-[15px]"><Link to={"/herbs"}>약초도감</Link></li>
                            <li className="mx-3 font-bold text-[15px]"><Link to={"/chat/herbs-recommend"}>추천약초</Link></li>
                            <li className="mx-3 font-bold text-[15px]"><Link to={"/community"}>커뮤니티</Link></li>
                        </ul>
                    </nav>
                </div>

                {/* 우측 영역 - 데스크탑/모바일 공통 */}
                <div className="flex items-center gap-2 ">
                    {/* 북마크, 알림 아이콘 */}
                    {isLogin && (
                        <div className="bg-[rgba(255,255,255,0.7)] rounded-2xl p-4 flex">
                            {/* 북마크 */}
                            <Link to="/users/me" className="mx-2 hover:text-primary-green text-gray-500">
                                <FiBookmark size={22} />
                            </Link>

                            {/* 알림 모달 */}
                            <Notification />
                        </div>
                    )}

                    {/* 로그인/회원가입 (데스크탑 전용) */}
                    <div className="hidden md:flex ml-3">
                        {isLogin ? (
                            <Profile />
                        ) : (
                            <>
                                <div title="로그인" className="ml-2 border p-1 text-[15px] bg-white border-[#e6e7e9] rounded-2xl w-[88px] text-center">
                                    <Link to={"/auth/login"}>로그인</Link>
                                </div>
                                <div title="회원가입" className="ml-2 p-1 text-[15px] rounded-2xl w-[88px] text-center bg-[#05d182] text-white">
                                    <Link to={"/auth/signup"}>회원가입</Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* 모바일 하단 네비게이션 */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md flex justify-around items-center h-25 md:hidden z-50">
                <Link to="/" className="flex flex-col items-center text-xl gap-2 hover:text-hover-primary-green">
                    <FiHome size={22} />
                    홈
                </Link>
                <Link to="/herbs" className="flex flex-col items-center text-xl gap-2 hover:text-hover-primary-green">
                    <FiBook size={22} />
                    약초도감
                </Link>
                <Link to="/chat/herbs-recommend" className="flex flex-col items-center text-xl gap-2 hover:text-hover-primary-green">
                    <FiHeart size={22} />
                    추천
                </Link>
                <Link to="/community" className="flex flex-col items-center text-xl gap-2 hover:text-hover-primary-green">
                    <FiUsers size={22} />
                    커뮤니티
                </Link>
                {isLogin ? (
                    <Link to="/users/me" className="flex flex-col items-center text-xl gap-2 hover:text-hover-primary-green">
                        <FiUser size={22} />
                        내정보
                    </Link>
                ) : (
                    <Link to="/auth/login" className="flex flex-col items-center text-xl gap-2 hover:text-hover-primary-green">
                        <FiUser size={22} />
                        로그인
                    </Link>
                )}
            </nav>

        </>
    );
}
