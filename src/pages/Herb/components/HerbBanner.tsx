interface HerbBannerProps {
    herbs: Herb[]
}
import { Link } from "react-router";
import HerbTitle from "./HerbTitle";
import { Herb } from "../../../types/herb.types";
import ErrorMessageCard from "../../../components/card/ErrorMessageCard";

export default function HerbBanner({ herbs}: HerbBannerProps) {
    return (
        <section className="md:block hidden md:mt-18 mt-30 w-full h-150 ">
            <HerbTitle elementName={"h2"} className="text-[#333] text-3xl mb-2 font-black flex items-center">
                미리보기
            </HerbTitle>

            {herbs.length<1 && <ErrorMessageCard text="조회된 미리보기가 없습니다." />}
            <ul className="md:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid h-full gap-5">
                {
                    herbs.slice(herbs.length - 3).map((herb) => {
                        return (
                            <li key={herb.id} className="w-full transition ">
                                <Link to={"" + herb.id} className="relative">
                                    <div className="w-full h-full grayscale-70 hover:grayscale-0 transition">
                                        <img src={herb.imgUrl1} alt={herb.cntntsSj} className={"h-full w-full rounded-2xl"} height={450} width={300} />
                                    </div>
                                    <div className="absolute bottom-0 flex flex-col p-3 text-white">
                                        <span className="bg-primary-green text-white text-[12px] p-0.5 px-2  rounded-[3px]">{herb.bneNm}</span>
                                        <strong className="text-[18px] drop-shadow-[1px_1px_2px_black]">{herb.cntntsSj}</strong>
                                    </div>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </section>
    )
}