import { Link } from "react-router";
import HerbTitle from "./HerbTitle";
import { Herb } from "../../../types/herb.types";
import Skeleton from "react-loading-skeleton";

interface HerbBannerProps {
    herbs: Herb[]
    isLoading?: boolean;
}

export default function HerbBanner({ herbs, isLoading }: HerbBannerProps) {


    return (
        <section className="md:block hidden md:mt-18 mt-30 w-full">
            <HerbTitle elementName={"h2"} className="text-[#333] text-3xl mb-2 font-black flex items-center animate-fade-left">
                미리보기
            </HerbTitle>

            {isLoading && <Skeleton borderRadius={5} height={380} count={3} containerClassName="flex gap-5" />}
            <ul className="flex gap-5 h-auto max-h-[350px]">
                {
                    herbs.slice(herbs.length - 3).map((herb, index) => {
                        return (
                            <li
                                key={herb.id}
                                className={`transition animate-fade-up`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <Link to={"" + herb.id} className="relative">
                                    <div className="w-full h-full grayscale-70 hover:grayscale-0 transition overflow-hidden">
                                        <img src={herb.imgUrl1} alt={herb.cntntsSj} className={"h-full w-full rounded-2xl hover:scale-120 transition-transform"} height={450} width={300} />
                                    </div>
                                    <div className="absolute bottom-0 flex flex-col p-3 text-white">
                                        <span className="bg-primary-green text-white text-2xl p-0.5 px-2 rounded-[3px]">{herb.bneNm}</span>
                                        <strong className="text-[25px] drop-shadow-[1px_1px_2px_black]">{herb.cntntsSj}</strong>
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