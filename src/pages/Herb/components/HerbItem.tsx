// interface HerdItemProps { }

import { Link } from "react-router";

export default function HerbItem() {
    return (
        <li className="w-full h-auto transition">
            <Link to="" className="h-auto">
                <div>
                    <img src="https://picsum.photos/1240/600" alt="버섯" className="w-full h-full rounded-[5px]" />
                </div>
                <div className="flex flex-col items-start p-2 h-auto">
                    <strong className="text-[20px]">버섯</strong>
                    <span className=" text-[12px]">2월 ~ 6월</span>
                    <span className="bg-primary-green text-white text-[12px] rounded-[3px] px-2">꿀풀과</span>
                </div>
            </Link>
        </li>
    )
}