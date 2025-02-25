import { Link } from "react-router";
import { useHerbRandomGetQuery } from "../../../hooks/querires/useQueryHerbs"
import HerbItem from "../../Herb/components/HerbItem";
import HerbList from "../../Herb/components/HerbList";
import { Herb } from "../../../types/herb.types";
import HerbTitle from "../../Herb/components/HerbTitle";
import HerbNotFoundCard from "../../../components/card/HerbNotFoundCard";

interface HerbDetailFooterProps {
    herbId: number
}

export default function HerbDetailFooter({ herbId }: HerbDetailFooterProps) {

    const { herbs, isError, isLoading, status } = useHerbRandomGetQuery(herbId);

    return (
        <div className="mt-20">
            <HerbTitle elementName={"h2"} className="text-3xl font-black">
                이 약초들은 어떤가요?
            </HerbTitle>

            {herbs ?
                <HerbList>
                    {herbs.map((herb: Herb) => {
                        return (

                            <HerbItem key={herb.id}>
                                <Link to={"/herbs/" + herb.id} className="h-auto ">
                                    <div>
                                        <img src={herb.imgUrl1} alt={herb.cntntsSj} className="w-full h-full rounded-[5px]" />
                                    </div>
                                    <div className="flex flex-col items-start p-2 h-auto">
                                        <strong className="text-[18px]">{herb.cntntsSj}</strong>
                                        <span className=" text-[12px]">2월 ~ 6월</span>
                                        <span className="bg-primary-green text-white text-[12px] rounded-[3px] px-2">{herb.bneNm}</span>
                                    </div>
                                </Link>
                            </HerbItem>

                        )
                    })}
                </HerbList>
                : <HerbNotFoundCard/>
            }

        </div>
    )
}