import { Link } from "react-router"; // 오타 수정 반영
import { FiBook, FiHeart, FiUsers, FiUser, FiBookmark, FiMenu, FiChevronDown } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import Profile from "../../pages/Home/components/Profile";
import Logo from "../icon/Logo";
import Notification from "../Notification";
import ShowMoreMenuModal from "../modal/ShowMoreMenuModal";
import { Dialog, Trigger } from "@radix-ui/react-dialog";
import { useState } from "react";

export default function Header() {
    const isLogin = useAuth();
    const [showCommunityDropdown, setShowCommunityDropdown] = useState(false);

    return (
        <>
            {/* 상단 헤더 */}
            <header className="bg-transparent flex justify-between h-35 items-center px-4 fixed top-0 left-1/2 -translate-x-1/2 w-full z-[1000] bg-white border-b border-gray-100">
                <div className="max-w-[1200px] flex justify-between items-center w-full mx-auto">
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
                                <li className="mx-3 font-bold text-[15px] relative">
                                    <div
                                        className="flex items-center cursor-pointer"
                                        onMouseEnter={() => setShowCommunityDropdown(true)}
                                        onMouseLeave={() => setShowCommunityDropdown(false)}
                                    >
                                        <span>커뮤니티</span>
                                        <FiChevronDown className="ml-1" size={14} />

                                        {/* 드롭다운 메뉴 */}
                                        {showCommunityDropdown && (
                                            <div className="absolute top-full left-0 mt-0 w-[102px] bg-white border border-gray-200 rounded-md shadow-lg z-[1001]">
                                                <Link to="/community/posts" className="block px-4 py-2 text-xl hover:bg-gray-100 transition-colors">
                                                    커뮤니티
                                                </Link>
                                                <Link to="/community/qna" className="block px-4 py-2 text-xl hover:bg-gray-100 transition-colors">
                                                    Q&A
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </li>
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
                </div>
            </header>
            <div className="h-35 mb-10"></div>

            {/* 모바일 하단 네비게이션 */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md flex justify-around items-center h-25 md:hidden z-50">
                <Link to="/herbs" className="flex flex-col items-center text-xl gap-2 hover:text-hover-primary-green">
                    <FiBook size={22} />
                    약초도감
                </Link>
                <Link to="/chat/herbs-recommend" className="flex flex-col items-center text-xl gap-2 hover:text-hover-primary-green">
                    <FiHeart size={22} />
                    추천
                </Link>
                {/* 모바일에서도 커뮤니티 터치 시 서브메뉴 표시 */}
                <div className="relative">
                    <button
                        onClick={() => setShowCommunityDropdown(!showCommunityDropdown)}
                        className="flex flex-col items-center text-xl gap-2 hover:text-hover-primary-green"
                    >
                        <FiUsers size={22} />
                        커뮤니티
                    </button>
                    {showCommunityDropdown && (
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-[1001]">
                            <Link to="/community/posts" className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors">
                                커뮤니티
                            </Link>
                            <Link to="/community/qna" className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors">
                                Q&A
                            </Link>
                        </div>
                    )}
                </div>
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
                <Dialog>
                    <Trigger asChild>
                        <button className="flex flex-col items-center text-xl gap-2 hover:text-hover-primary-green">
                            <FiMenu size={22} />
                            더보기
                        </button>
                    </Trigger>
                    {/* 더보기 메뉴 모달 */}
                    <ShowMoreMenuModal />
                </Dialog>
            </nav>
        </>
    );
}
