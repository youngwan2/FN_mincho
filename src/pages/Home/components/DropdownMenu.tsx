import { useNavigate } from "react-router"
import { CiUser } from "react-icons/ci";
import { IoMdLogOut } from "react-icons/io";
import { logout } from "../../../service/auth.service";


interface DropdownMenuProps {
    ref: React.RefObject<HTMLDivElement | null>
    isToggle: boolean
}
export default function DropdownMenu({ ref, isToggle }: DropdownMenuProps) {

    const router = useNavigate();

    function handleLogout() {
        logout()
    }

    return (
        <div ref={ref} className={`${isToggle ? 'animate-fade-down visible opacity-100' : 'invisible opacity-0'} absolute w-[115px] h-[75px] border border-[#F2F2F7] rounded-[10px] right-[1.25rem] top-[3.875rem] z-50  bg-white  `}>
            <div className="flex flex-col items-start justify-center  h-full rounded-[10px]">
                <button
                    onClick={() => router("/users/me")}
                    className="my-2 text-[14px] flex items-center hover:bg-[#F2F2F7] p-1 w-full">
                    <CiUser className="mr-2 " />마이페이지</button>
                <button
                    onClick={handleLogout}
                    className="my-2 text-[14px] flex items-center hover:bg-[#F2F2F7] p-1 w-full">
                    <IoMdLogOut className="mr-2" />로그아웃</button>
            </div>
        </div>
    )

}