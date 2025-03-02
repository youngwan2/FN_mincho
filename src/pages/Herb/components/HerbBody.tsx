interface HerbBodyProps {
    herbs: Herb[]
}

import { Link } from "react-router";
import { Herb } from "../../../types/herb.types";
import HerbHeader from "./HerbHeader";
import HerbItem from "./HerbItem";
import HerbList from "./HerbList";
import HerbSort from "./HerbSort";
import HerbTitle from "./HerbTitle";
import ErrorMessageCard from "../../../components/card/ErrorMessageCard";

export default function HerbBody({ herbs }: HerbBodyProps) {
    return (
        <div className="mt-30">
            <HerbHeader
                title={<HerbTitle elementName={"h2"} className="text-[#333] text-3xl mb-2 font-black flex items-center">
                    약초목록
                </HerbTitle>}
                sort={<HerbSort />}
            />
            <HerbList>
                {herbs.slice(3, herbs.length).length<1 && <ErrorMessageCard text="조회된 약초 목록이 없습니다."/>}
                {herbs.slice(3, herbs.length).map((herb) => {
                    return (
                        <HerbItem key={herb.id}>
                            <Link to={"" + herb.id} className="h-auto">
                                <div>
                                    <img src={herb.imgUrl1} alt={herb.cntntsSj} className="w-full h-[200px] rounded-[5px]" height={250} width={250} />
                                </div>
                                <div className="flex flex-col items-start p-2 h-auto">
                                    <strong className="text-[18px]">{herb.cntntsSj}</strong>
                                    <span className=" text-[12px]">{herb.hbdcNm}</span>
                                    <span className="bg-primary-green text-white text-[12px] rounded-[3px] px-2 mt-2">{herb.bneNm}</span>
                                </div>
                            </Link>
                        </HerbItem>
                    )
                })}
            </HerbList>
        </div>
    )
}