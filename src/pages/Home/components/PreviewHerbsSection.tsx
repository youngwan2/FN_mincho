import EmblaCarousel from "./carousel/blooming-herbs/EmblaCarousel"
import { EmblaOptionsType } from 'embla-carousel'
import MoreButton from "./MoreButton"
import { useHerbsGetQuery } from "../../../hooks/queries/useQueryHerbs"
import { useNavigate } from "react-router"


export default function PreviewHerbsSection() {


    const navigate = useNavigate();

    const { herbs, isError } = useHerbsGetQuery(5, {
        bneNm: '',
        month: '',
        orderBy: '',
        search: '',
        sort: 'desc',
        cntntsSj: ''
    })
    const OPTIONS: EmblaOptionsType = { dragFree: true }
    const SLIDES = herbs

    return (
        <section className="md:flex-row flex-col flex mt-40 md:p-10 p-0 relative ">
            <div className="md:w-[30%] md:block flex justify-between w-full z-10">
                <h2 className="text-4xl  leading-13">약초도감 <br /> <strong>미리보기</strong></h2>
                <MoreButton onClick={() => navigate("/herbs")} />
            </div>
            <div className={`${isError ? '' : ''} md:max-w-[80%] md:mt-0 mt-10 w-full z-10 relative`}>
                <EmblaCarousel herbs={SLIDES} options={OPTIONS} />
            </div>
            <div className='md:block hidden top-[-30px] left-0 absolute w-full h-[300px] bg-[#F2F2F7] z-0'></div>
        </section>
    )
}
