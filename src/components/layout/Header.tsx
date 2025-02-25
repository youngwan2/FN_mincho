import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import Profile from "../../pages/Home/components/Profile";
import Logo from "../icon/Logo";
import usePathType from "../../hooks/usePathType";

export default function Header() {

    const isLogin = useAuth();
    const isHerbDetailPage = usePathType();

    return (
        <header className="bg-transparent flex justify-between h-40 items-center ">
            <div className="flex">
                <h1 className="font-bold">
                    <Link to={"/"}>
                        <Logo />
                    </Link>
                </h1>
                <nav className="ml-15">
                    <ul className="flex">
                        <li className={`mx-3 font-semibold ${isHerbDetailPage ? "text-white drop-shadow-[1px_1px_rgba(0,0,0,0.5)]" : ""}`}><Link to={"/herbs"}>약초도감</Link></li>
                        <li className={`mx-3 font-semibold ${isHerbDetailPage ? "text-white drop-shadow-[1px_1px_rgba(0,0,0,0.5)]" : ""}`}><Link to={"/herbs/season"}></Link>계절약초</li>
                        <li className={`mx-3 font-semibold ${isHerbDetailPage ? "text-white drop-shadow-[1px_1px_rgba(0,0,0,0.5)]" : ""}`}><Link to={"/community"}></Link> 커뮤니티</li>
                    </ul>
                </nav>
            </div>
            <div className="flex">
                <button>
                    <IoSearchOutline size={24} />
                </button>
                <ul className="flex">
                    {/* 로그인 상태에 따른 UI 렌더링 다르게 */}
                    {
                        isLogin
                            ? <li><Profile /></li>
                            : <>
                                <li title="로그인" className="ml-2 border p-1 px-2 bg-white border-[#e6e7e9] rounded-2xl w-[88px] text-center">
                                    <Link to={"/auth/login"}>
                                        <span>
                                            로그인
                                        </span>
                                    </Link>
                                </li>
                                <li title="회원가입" className="ml-2  p-1 px-2 rounded-2xl w-[88px] text-center bg-[#05d182] text-white">
                                    <Link to={"/auth/signup"}>
                                        <span>
                                            회원가입
                                        </span>
                                    </Link>
                                </li>
                            </>
                    }
                </ul>
            </div>
        </header>
    )
}