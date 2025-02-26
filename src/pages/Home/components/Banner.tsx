import { useHerbBloomingGetQuery } from "../../../hooks/queries/useQueryHerbs";

import EmblaCarousel from "../components/carousel/banner/EmblaCarousel";
import Wave from "./carousel/banner/Wave";
import LoadingSpinner from "../../../components/spinner/LoadingSpinner";
import { EmblaOptionsType } from 'embla-carousel'


export default function Banner() {

    const month = `${new Date().getMonth() + 1}월`
    const { herbs, isError, isLoading  } = useHerbBloomingGetQuery(month)

    const OPTIONS: EmblaOptionsType = { dragFree: true }

    return (
        <div className="h-[658px] w-full relative">
            {isLoading ? <LoadingSpinner /> : null}
            <EmblaCarousel slides={herbs} options={OPTIONS} month={month} />
            <Wave />
        </div>
    )
}