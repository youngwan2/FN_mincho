
import { FormEvent } from "react";
import { HiOutlineMail } from "react-icons/hi";
import Submit from "../../../components/button/Submit";

export default function FindPasswordForm() {

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();


    }


    return (
        <form className="mt-15 w-full max-w-[70%] text-center" onSubmit={handleSubmit} >
            <div className="flex flex-col items-start w-full]">
                <label className="w-[150px] flex items-center text-2xl mb-1.5" htmlFor="email" title="이메일"><HiOutlineMail className="mr-2" />이메일(Email)</label>
                <input className="p-2 w-full border border-[#e6e7e9] rounded-[5px]" type="email" id="email" name="email" />
            </div>
            <Submit
                disabled={false}
                text="비밀번호 찾기"
                className=" cursor-pointer mt-15 text-white bg-[#05D182] hover:bg-[#07BD77] max-w-[380px] w-full p-2 rounded-[5px]"
            />
        </form >
    )
}