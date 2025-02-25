import { HerbDetail } from "../../../types/herb.types"
import HerbTitle from "../../Herb/components/HerbTitle"

interface HerbDetailHeaderProps {
    herb: HerbDetail
}

export default function HerbDetailHeader({ herb }: HerbDetailHeaderProps) {
    return (
        <div className="mt-5">
            {/* */}
            <strong className="text-2xl font-semibold text-[#444]"> <span>{herb.hbdcNm}</span></strong>
            <HerbTitle elementName={"h2"} className="text-4xl font-bold mt-3">
                {herb.cntntsSj}
            </HerbTitle>
            {/* 학명 */}
            <span className="bg-primary-green text-white text-[12px] rounded-[3px] px-2 py-1 mt-3">{herb.bneNm}</span>
        </div>
    )
}