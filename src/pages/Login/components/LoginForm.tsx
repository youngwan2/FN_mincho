import { FormEvent } from "react"
import { Link, useNavigate } from "react-router"
import { HiOutlineMail } from "react-icons/hi";
import { IoLockOpenOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import {  login } from "../../../service/auth";
import Submit from "../../Register/components/Submit";
import { useUserStore } from "../../../store/loginState";
import { getInitialProfile } from "../../../service/user";


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

    const setProfile= async() => {
       const profile = await getInitialProfile();

       setUserState(profile)
    }


    return (
        <div className="md:h-[80vh] md:flex-row items-center flex-col-reverse h-auto flex p-[20px] max-w-[1240px] w-full bg-white rounded-3xl">

            {/* 로그인 폼 섹션 */}
            <div className="md:w-[50%] h-full mr-2 w-full text-center">
                <div className="flex flex-col justify-center items-center mt-[7rem]">
                    <h2 className="text-2xl font-bold">Welcome! MinCho</h2>
                    <p className="mt-2">민간 약초 커뮤니티, 민초에 오신 것을 환영합니다.</p>

                    <div className="flex flex-col justify-center items-center mt-[1rem] w-full">

                        {/* 로그인 폼 */}
                        <form className="mt-8 w-full max-w-[70%]" onSubmit={handleSubmit}>
                            <div className="flex items-center w-full]">
                                <label className="w-[30px] inline-block" htmlFor="email" title="이메일"><HiOutlineMail /></label>
                                <input className="p-2 w-full border border-[#e6e7e9] rounded-[5px]" type="email" id="email" name="email" />
                            </div>
                            <div className="flex items-center mt-5 w-full">
                                <label className="w-[30px] inline-block" htmlFor="password" title="비밀번호"><IoLockOpenOutline /></label>
                                <input className="p-2 w-full border border-[#e6e7e9] rounded-[5px]" type="password" id="password" name="password" />
                            </div>
                            <Submit
                                disabled={false}
                                text="로그인"
                                className="cursor-pointer mt-8 text-white bg-[#05D182] hover:bg-[#07BD77] max-w-[380px] w-full p-2 rounded-[5px]"
                            />
                        </form>

                        {/* 회원가입 가이드 */}
                        <div className="mt-5 text-[14px]" >
                            <span>아직 회원이 아니신가요?</span>
                            <Link to="/auth/signup" className="ml-2 border-b hover:text-[#05D182]">회원가입</Link>
                        </div>
                    </div>

                </div>
            </div>

            {/* 이미지 섹션 */}
            <div className="md:w-[50%] md:h-full md:block hidden ">
                <img className="w-full h-full rounded-2xl" src="https://picsum.photos/500/700"></img>
            </div>
        </div>
    )
}