import { IoIosInformationCircleOutline } from "react-icons/io";
import { Link } from "react-router";
import FindPasswordForm from "./components/FindPasswordForm";


export default function FindPasswordPage() {
    return (
        <div className="items-center flex-col justify-center h-[55vh] flex p-[10px] max-w-[512px] w-full bg-white rounded-3xl  animate-fade-down">
            <h2 className="text-4xl font-bold">비밀번호 찾기</h2>
            <div className=" mt-10 px-27  ">
                <div className="flex items-center text-[14px] bg-[#f7f7f7] rounded-xl p-3">
                    <IoIosInformationCircleOutline className="m-[20px]" />
                    기존에 가입하신 이메일을 입력하시면, 해당 이메일로 비밀번호 재설정 안내를 진행합니다.
                </div>
            </div>
            <FindPasswordForm />
            <Link to="/auth/login" className="cursor-pointer border w-full p-2 max-w-[345px] text-center rounded-[5px] text-[#05D182] mt-5 ">로그인하러 가기</Link>
        </div>
    )
}