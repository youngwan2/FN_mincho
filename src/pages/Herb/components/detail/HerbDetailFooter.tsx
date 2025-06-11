import { useHerbRandomGetQuery } from "@/hooks/queries/useQueryHerbs";
import { Link } from "react-router";
import HerbTitle from "../main/HerbTitle";
import HerbList from "../main/HerbList";
import { Herb } from "@/types/herb.types";
import HerbItem from "../main/HerbItem";
import HerbNotFoundCard from "@/components/card/HerbNotFoundCard";

interface HerbDetailFooterProps {
    herbId: number
}

export default function HerbDetailFooter({ herbId }: HerbDetailFooterProps) {

    const { herbs } = useHerbRandomGetQuery(herbId);

    return (
        <div className="mt-15">
            <hr className="border-primary-light-gray" />
            <HerbTitle elementName={"h2"} className="text-4xl font-black mt-15">
                이 약초들은 어떤가요?
            </HerbTitle>

            {herbs ?
                <HerbList>
                    {herbs.map((herb: Herb) => {
                        return (
                            <HerbItem key={herb.id}>
                                <Link to={"/herbs/" + herb.id} className="h-auto ">
                                    <div>
                                        <img src={herb.imgUrl1} alt={herb.cntntsSj} className="w-full h-[200px] rounded-[5px]" />
                                    </div>
                                    <div className="flex flex-col items-start p-2 h-auto">
                                        <strong className="text-[18px]">{herb.cntntsSj}</strong>
                                        <span className="text-[13px]">{herb.hbdcNm}</span>
                                        <span className="bg-primary-green text-white text-[12px] rounded-[3px] px-2 mt-2">{herb.bneNm}</span>
                                    </div>
                                </Link>
                            </HerbItem>

                        )
                    })}
                </HerbList>
                : <HerbNotFoundCard />
            }

        </div>
    )
}