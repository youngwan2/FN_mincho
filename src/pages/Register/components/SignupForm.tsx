import { Link } from "react-router"
import { HiOutlineMail } from "react-icons/hi";
import { IoLockOpenOutline, IoLockClosedOutline } from "react-icons/io5";
import Submit from "./Submit";
import { useRegisterForm } from "../../../hooks/useRegisterForm";
import { useState } from "react";

/** TODO: 이메일 인증 번호 */
export default function SignupForm() {


    const [isSendAction, setIsSendAction] = useState(false);

    const {
        errors,
        isAction,
        isLoading,
        handleEmailChange,
        handleEmailCheck,
        handlePasswordChange,
        handlePasswordConfirmChange,
        handleVerificationCodeChange,
        handleVerificationCodeCheck,
        handleSubmit
    } = useRegisterForm()


    return (
        <div className="md:h-[90vh] md:flex-row items-center flex-col-reverse h-auto flex p-[20px] max-w-[1240px] w-full bg-white rounded-3xl">

            {/* 회원가입 폼 섹션 */}
            <div className="md:w-[50%] h-full mr-2 w-full text-center">
                <div className="md:mt-[4rem] mt-2 flex flex-col justify-center items-center">
                    <h2 className="text-3xl font-bold">회원등록</h2>
                    <form className="mt-13 w-full max-w-[70%]" onSubmit={handleSubmit} >
                        {/* 이메일 */}
                        <div>
                            <div className="flex flex-col  w-full">
                                <label className="w-[150px] flex items-center text-2xl mb-1.5" htmlFor="email" title="이메일"><HiOutlineMail className="mr-2" />이메일(Email)</label>
                                <div className="flex">
                                    <input
                                        className="p-2 w-full border border-r-0 border-[#e6e7e9] rounded-l-[5px]"
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="이메일"
                                        onChange={handleEmailChange}
                                    />
                                    {/* 이메일 확인 */}
                                    <button
                                        onClick={handleEmailCheck}
                                        type="button"
                                        className="hover:bg-[#F2F2F7] cursor-pointer w-[50px] border py-2 border-l-0 border-[#e6e7e9] rounded-r-[5px]">확인</button>
                                </div>
                            </div>
                            {errors.email && <p className="text-red-500 text-left text-[14px]">{errors.email}</p>}
                        </div>

                        {/* 인증번호 */}
                        <div className=" mt-5 flex items-center">
                            <div className="flex justify-start  w-full">
                                <input
                                    className="p-2 w-full border border-[#e6e7e9] rounded-[5px]"
                                    type="number"
                                    placeholder="인증번호"
                                    onChange={handleVerificationCodeChange}
                                />
                            </div>
                            <button
                                onClick={handleVerificationCodeCheck}
                                className="hover:bg-[#F2F2F7] cursor-pointer w-[50px] border py-2 border-l-0 border-[#e6e7e9] rounded-r-[5px]">확인</button>
                            {errors.verificationCode && <p className="text-red-500 text-left text-[14px]">{errors.verificationCode}</p>}
                        </div>

                        {/* 비밀번호 */}
                        <div className="mt-10">
                            <div className="flex flex-col w-full">
                                <label className="w-[150px] flex items-center text-2xl mb-1.5" htmlFor="password" title="비밀번호"><IoLockOpenOutline className="mr-2" />비밀번호</label>
                                <input
                                    className="p-2 w-full border border-[#e6e7e9] rounded-[5px]"
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="비밀번호"
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            {errors.password && <p className="text-red-500 text-left text-[14px]">{errors.password}</p>}
                        </div>

                        {/* 비밀번호 재확인 */}
                        <div className="mt-8">
                            <div className="flex flex-col w-full">
                                <label className="w-[150px] flex items-center text-2xl mb-1.5" htmlFor="password-confirm" title="비밀번호 재확인"><IoLockClosedOutline className="mr-2" />비밀번호 재확인</label>
                                <input
                                    className="p-2 w-full border border-[#e6e7e9] rounded-[5px]"
                                    type="password"
                                    id="password-confirm"
                                    name="password-confirm"
                                    placeholder="비밀번호 재확인"
                                    onChange={handlePasswordConfirmChange}
                                />
                            </div>
                            {errors.passwordConfirm && <p className="text-red-500 text-left text-[14px]">{errors.passwordConfirm}</p>}
                        </div>
                        <Submit
                            disabled={isLoading}
                            text={isAction
                                ? '회원가입'
                                : '등록 불가'}
                            className={`${ isLoading ? 'opacity-30 bg-gray-300 cursor-not-allowed' : ''} cursor-pointer mt-10 text-white bg-[#05D182] hover:bg-[#07BD77] max-w-[380px] w-full p-2 rounded-[5px]`} />
                    </form>

                    {/* 로그인 안내 링크 */}
                    <div className="mt-8 text-[14px]" >
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