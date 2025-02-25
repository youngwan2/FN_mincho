import { useHerbBloomingGetQuery } from "../../../hooks/querires/useQueryHerbs";
import EmblaCarousel from "../components/carousel/banner/EmblaCarousel";
import { EmblaOptionsType } from 'embla-carousel'
import Wave from "./carousel/banner/Wave";

export default function Banner() {

    const month = `${new Date().getMonth() + 1}월`
    const { herbs, isError, isLoading, status } = useHerbBloomingGetQuery(month)

    const OPTIONS: EmblaOptionsType = { dragFree: true }

    return (
        <div className="h-[658px] w-full relative">
            <EmblaCarousel slides={herbs} options={OPTIONS} month={month} />
            <Wave/>
        </div>
    )
}