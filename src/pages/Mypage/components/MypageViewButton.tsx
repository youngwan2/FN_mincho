import { IoEyeOutline } from "react-icons/io5";
// interface MypageViewButtonProps { }

export default function MypageViewButton() {
    return (
        <div className="flex items-center">
            <IoEyeOutline />
            <span className="ml-2">보기</span>
        </div>
    )
}