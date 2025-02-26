import { MouseEventHandler } from "react";
import { IoEyeOutline } from "react-icons/io5";
interface MypageViewButtonProps { 
    onNavigate:MouseEventHandler
}

export default function MypageViewButton({onNavigate}:MypageViewButtonProps) {
    return (
        <button className="text-gray-600 px-2 hover:text-hover-primary-green hover:cursor-pointer" onClick={onNavigate}>
            <div className="flex items-center">
                <IoEyeOutline />
                <span className="ml-2">보기</span>
            </div>
        </button>
    )
}