import { FormEvent } from "react"
import { Link, useNavigate } from "react-router"
import { HiOutlineMail } from "react-icons/hi";
import { IoLockOpenOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { login } from "../../../service/auth.service";
import Submit from "../../../components/button/Submit";
import { useUserStore } from "../../../store/loginState";
import { FcGoogle } from "react-icons/fc";
import Logo from "../../../components/icon/Logo";
import { getInitialProfile } from "@/service/profile.service";


export default function LoginForm() {

    const router = useNavigate();

    const { setUserState } = useUserStore()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const email = formData.get('email')?.toString() || ''
        const password = formData.get('password')?.toString() || ''

        if (email.length < 2) {
            toast("이메일을 입력해주세요")
        }
        if (password.length < 2) {
            toast("비밀번호를 입력해주세요")
        }

        // 로그인 요청
        await login({ email, password })

        // 프로필 조회
        await setProfile()

        // 홈 리디렉션
        router("/")

    }

    const setProfile = async () => {
        const profile = await getInitialProfile();

        setUserState(profile)
    }


    const handleGoogleLogin = () => {
        window.location.href = import.meta.env.VITE_GOOGLE_URL
    }


    return (
        <div className="flex max-w-[812px] bg-white h-full w-full flex-col justify-center items-center relative min-h-screen">
            {/* 모바일: 뒤로가기 버튼, 데스크탑: 로고 */}
            <div className="absolute left-4 top-4 md:left-8 md:top-10 z-10">
                <span className="block md:hidden">
                    <button type="button" onClick={() => window.history.back()} aria-label="뒤로가기" className="flex items-center text-lg px-2 py-1 rounded hover:bg-gray-100">
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M15 18l-6-6 6-6" /></svg>
                        <span>뒤로가기</span>
                    </button>
                </span>
                <span className="hidden md:block">
                    <Link title="사이트 로고, 클릭 시 홈페이지로" to={"/"}>
                        <Logo />
                    </Link>
                </span>
            </div>
            {/* 타이틀 */}
            <h2 className="text-3xl md:text-4xl font-bold animate-fade-down w-full text-left md:text-center mt-20 md:mt-24 px-6 md:px-0">로그인</h2>
            <form className="w-full md:max-w-[70%] max-w-auto mt-8 md:mt-12 animate-fade-down px-5 py-10 md:px-8 md:py-12 bg-white sm:px-6 sm:py-8" onSubmit={handleSubmit}>
                <div className="flex flex-col items-start w-full">
                    <label className="w-[150px] flex items-center text-2xl mb-1.5" htmlFor="email" title="이메일"><HiOutlineMail className="mr-2" />이메일(Email)</label>
                    <input className="p-4 w-full border border-[#e6e7e9] rounded-[5px]" type="email" id="email" name="email" />
                </div>
                <div className="flex flex-col items-start mt-7 w-full">
                    <label className="w-[150px] flex items-center text-2xl mb-1.5" htmlFor="password" title="비밀번호"><IoLockOpenOutline className="mr-2" />비밀번호</label>
                    <input className="p-4 w-full border border-[#e6e7e9] rounded-[5px]" type="password" id="password" name="password" />
                </div>
                {/* 비밀번호 찾기 */}
                <div className="flex justify-end w-full">
                    <Link to="/auth/find-password" className="text-[14px] mt-3 hover:text-[#05D182]">비밀번호 찾기</Link>
                </div>
                <Submit
                    disabled={false}
                    text="로그인"
                    className="cursor-pointer mt-10 text-white bg-[#05D182] hover:bg-[#07BD77] w-full p-4 rounded-[5px]"
                />
            </form>
            {/* OR 구분선 */}
            <div className="py-8 w-full relative flex justify-center max-w-[70%] animate-fade-down">
                <div className="bg-white z-10 relative w-20 h-10 text-center text-gray-500">OR</div>
                <div className="absolute top-1/2 z-1 -translate-1/2 left-1/2  w-full border border-gray-100"></div>
            </div>
            {/* 구글 로그인 버튼 */}
            <div className="max-w-[70%] w-full flex items-center justify-center flex-col animate-fade-down">
                <button
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center gap-2 w-full border border-[#dddee0] rounded-[5px] p-4 hover:bg-[#f5f5f5] transition-colors"
                >
                    <FcGoogle size={24} />
                    <span className="text-2xl font-medium">Google 계정으로 로그인</span>
                </button>
                {/* 회원가입 가이드 */}
                <div className="mt-8 text-[14px]" >
                    <span>아직 회원이 아니신가요?</span>
                    <Link to="/auth/signup" className="ml-2 border-b border-gray-400 text-gray-700 text-[14.5px] hover:text-[#05D182]">회원가입</Link>
                </div>
            </div>
        </div>
    )
}