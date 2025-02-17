import { useState } from "react"
import { Link } from "react-router"
import { HiOutlineMail } from "react-icons/hi";
import { IoLockOpenOutline, IoLockClosedOutline } from "react-icons/io5";

export default function SignupForm() {

    const [signupErrors, setSignupErrors] = useState({
        email: '',

        password: ''
    })
    return (
        <div className="shadow-[inset_-5px_-5px_5px_rgba(0,0,0,0.1)] flex p-[20px] max-w-[1240px] w-full h-[80vh] bg-white rounded-3xl">

            {/* 로그인 폼 섹션 */}
            <div className="w-[50%] h-full mr-2">
                <div className="flex flex-col justify-center items-center mt-[7rem]">
                    <h2 className="text-2xl">회원등록</h2>
                    <form className="mt-8 w-full max-w-[65%]">
                        <div className="flex items-center w-full]">
                            <label className="w-[30px] inline-block" htmlFor="email" title="이메일"><HiOutlineMail /></label>
                            <input
                                className="p-2 w-full border border-[#e6e7e9] rounded-[5px]"
                                type="email"
                                id="email"
                                name="email"
                                placeholder="이메일"
                            />
                            {signupErrors.email && <span>{signupErrors.email}</span>}
                        </div>
                        <div className="flex items-center mt-5 w-full">
                            <label className="w-[30px] inline-block" htmlFor="password" title="비밀번호"><IoLockOpenOutline /></label>
                            <input
                                className="p-2 w-full border border-[#e6e7e9] rounded-[5px]"
                                type="password"
                                id="password"
                                name="password"
                                placeholder="비밀번호"
                            />
                            {signupErrors.password && <span>{signupErrors.password}</span>}
                        </div>
                        <div className="flex items-center mt-5 w-full">
                            <label className="w-[30px] inline-block" htmlFor="password-confirm" title="비밀번호 재확인"><IoLockClosedOutline /></label>
                            <input
                                className="p-2 w-full border border-[#e6e7e9] rounded-[5px]"
                                type="password"
                                id="password-confirm"
                                name="password-confirm"
                                placeholder="비밀번호 재확인"
                                />
                        </div>
                        <button className="my-5 text-white bg-[#05D182] hover:bg-[#07BD77] max-w-[500px] w-full p-2 rounded-[5px]">등록</button>
                    </form>
                    <div >
                        <span className="text-[16px]">회원 이신가요?</span>
                        <Link to="/auth/login" className="ml-2 border-b hover:text-[#05D182]">로그인</Link>
                    </div>
                </div>
            </div>
            {/* 이미지 섹션 */}
            <div className="w-[50%] h-full">
                <img className="w-full h-full rounded-2xl" src="https://picsum.photos/500/700"></img>
            </div>
        </div>
    )
}