// interface HerbBannerProps { }
import { IoSearchCircleSharp } from "react-icons/io5";

import { Link } from "react-router";
import HerbTitle from "./HerbTitle";

export default function HerbBanner() {
    return (
        <section className="md:mt-10 mt-30 w-full h-150 ">
            <HerbTitle elementName={"h2"} className="text-[#333] text-3xl mb-2 font-black flex items-center">
                <IoSearchCircleSharp className="text-2xl mr-1" />미리보기
            </HerbTitle>

            <ul className="flex h-full gap-5">
                <li className="w-full transition">
                    <Link to="">
                        <button className="grayscale-80 hover:grayscale-0 p-10 flex flex-col justify-end items-start w-full h-full bg-[url('https://picsum.photos/1240/600')] bg-cover bg-center rounded-[5px] text-white">
                            <span className="bg-primary-green text-white text-[12px] p-0.5 px-1.5 rounded-[3px]">꿀풀과</span>
                            <strong className="text-[18px] drop-shadow-[1px_1px_2px_black]">버섯</strong>
                            <span className=" text-[14px]  drop-shadow-[1px_1px_2px_black] ">2월 ~ 6월</span>
                        </button>
                    </Link>
                </li>
                <li className="w-full">
                    <Link to="">
                        <button className="grayscale-80 hover:grayscale-0 p-10 flex flex-col justify-end items-start w-full h-full bg-[url('https://picsum.photos/1240/600')] bg-cover bg-center rounded-[5px] text-white">
                            <span className="bg-primary-green text-white text-[12px] p-0.5 px-1.5 rounded-[3px]">꿀풀과</span>
                            <strong className="text-[18px] drop-shadow-[1px_1px_2px_black]">개나리</strong>
                            <span className=" text-[14px]  drop-shadow-[1px_1px_2px_black] ">2월 ~ 6월</span>
                        </button>
                    </Link>
                </li>
                <li className="w-full">
                    <Link to="">
                        <button className="grayscale-80 hover:grayscale-0 p-10 flex flex-col justify-end items-start w-full h-full bg-[url('https://picsum.photos/1240/600')] bg-cover bg-center rounded-[5px] text-white">
                            <span className="bg-primary-green text-white text-[12px] p-0.5 px-1.5 rounded-[3px]">꿀풀과</span>
                            <strong className="text-[18px] drop-shadow-[1px_1px_2px_black]">호두나무</strong>
                            <span className=" text-[14px]  drop-shadow-[1px_1px_2px_black] ">2월 ~ 6월</span>
                        </button>
                    </Link>
                </li>
            </ul>
        </section>
    )
}