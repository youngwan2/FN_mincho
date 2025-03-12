import { useHerbBloomingGetQuery } from "../../../hooks/queries/useQueryHerbs";
import EmblaCarousel from "../components/carousel/banner/EmblaCarousel";
import Wave from "./carousel/banner/Wave";
import LoadingSpinner from "../../../components/spinner/LoadingSpinner";
import { EmblaOptionsType } from 'embla-carousel'


export default function Banner() {

    const month = `${new Date().getMonth() + 1}월`
    const { herbs, isError, isLoading } = useHerbBloomingGetQuery(month)

    const OPTIONS: EmblaOptionsType = { dragFree: true }

    return (
        <div className={`${isError ? 'bg-primary-gray flex justify-center items-center' : 'bg-none'} h-[658px] w-full relative`}>
            {isLoading ? <LoadingSpinner /> :null}
            {!isError
                ?
                <>
                    <EmblaCarousel slides={herbs} options={OPTIONS} month={month} />
                    <Wave />
                </>
                : <p>이달의 개화약초 정보를 불러올 수 없습니다.</p>


            }
        </div>
    )
}