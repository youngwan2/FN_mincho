// interface HerbBodyProps { }

import HerbHeader from "./HerbHeader";
import HerbItem from "./HerbItem";
import HerbList from "./HerbList";
import HerbSort from "./HerbSort";
import HerbTitle from "./HerbTitle";

export default function HerbBody() {
    return (
        <div className="mt-30">
            <HerbHeader
                title={<HerbTitle elementName={"h2"} className="text-[#333] text-2xl mb-2 font-black flex items-center">
                    약초목록
                </HerbTitle>}
                sort={<HerbSort />}
            />
            <HerbList>
                <HerbItem />
                <HerbItem />
                <HerbItem />
                <HerbItem />
                <HerbItem />
                <HerbItem />
                <HerbItem />
                <HerbItem />
                <HerbItem />
            </HerbList>
        </div>
    )
}