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
        <div className="md:h-[80vh] md:flex-row items-center flex-col-reverse h-auto flex p-[20px] max-w-[1240px] w-full bg-white rounded-3xl">

            {/* 회원가입 폼 섹션 */}
            <div className="md:w-[50%] h-full mr-2 w-full text-center">
                <div className="md:mt-[7rem] mt-5 flex flex-col justify-center items-center">
                    <h2 className="text-2xl font-bold">회원등록</h2>
                    <form className="mt-8 w-full max-w-[70%]">
                        <div className="flex items-center w-full]">
                            <label className="w-[30px] inline-block" htmlFor="email" title="이메일"><HiOutlineMail /></label>
                            <input
                                className="p-2 w-full border border-r-0 border-[#e6e7e9] rounded-l-[5px]"
                                type="email"
                                id="email"
                                name="email"
                                placeholder="이메일"
                            />
                            <button className="w-[50px] border py-2 border-l-0 border-[#e6e7e9] rounded-r-[5px]">인증</button>
                            {signupErrors.email && <span>{signupErrors.email}</span>}
                        </div>
                        <div className="flex items-center w-full] mt-5">
                            <label className="w-[25px] inline-block" htmlFor="email" title="이메일"></label>
                            <input
                                className="p-2 w-full border border-[#e6e7e9] rounded-[5px]"
                                type="number"
                                placeholder="인증번호"
                            />
                            {signupErrors.email && <span>{signupErrors.email}</span>}
                        </div>
                        <div className="flex items-center mt-5 w-full">
                            <label className="w-[25px] inline-block" htmlFor="password" title="비밀번호"><IoLockOpenOutline /></label>
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
                            <label className="w-[25px] inline-block" htmlFor="password-confirm" title="비밀번호 재확인"><IoLockClosedOutline /></label>
                            <input
                                className="p-2 w-full border border-[#e6e7e9] rounded-[5px]"
                                type="password"
                                id="password-confirm"
                                name="password-confirm"
                                placeholder="비밀번호 재확인"
                            />
                        </div>
                        <button className="cursor-pointer mt-8 text-white bg-[#05D182] hover:bg-[#07BD77] max-w-[380px] w-full p-2 rounded-[5px]">등록</button>
                    </form>
                    <div className="mt-5 text-[14px]" >
                        <span>회원 이신가요?</span>
                        <Link to="/auth/login" className="ml-2 border-b hover:text-[#05D182]">로그인</Link>
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