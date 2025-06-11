import { HerbDetail } from "@/types/herb.types"
import HerbTitle from "../main/HerbTitle"

interface HerbDetailHeaderProps {
    herb: HerbDetail
}

export default function HerbDetailHeader({ herb }: HerbDetailHeaderProps) {
    return (
        <div className="mt-5">
            <HerbTitle elementName={"h2"} className="text-5xl font-bold">
                {herb.cntntsSj}
                <span className="pl-2 text-2xl font-semibold text-[#444]">{herb.hbdcNm}</span>
            </HerbTitle>
            {/* 학명 */}
            <span className="bg-primary-green text-white text-[14px] rounded-[3px] px-2 py-1 mt-3">{herb.bneNm}</span>
        </div>
    )
}