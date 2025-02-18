import EmblaCarousel from "../components/carousel/blooming-herbs/EmblaCarousel"
import { EmblaOptionsType } from 'embla-carousel'
import MoreButton from "./MoreButton"


export default function BloomingHerbsSection() {
    const OPTIONS: EmblaOptionsType = { dragFree: true }
    const SLIDE_COUNT = 5
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

    return (
        <section className="flex mt-40 p-10 relative">
            <div className="z-10 w-[30%]">
                <h2 className="text-4xl  leading-13">이달의 <br /> <strong>개화 약초</strong></h2>
                <MoreButton/>
            </div>
            <div className="max-w-[80%] z-10">
                <EmblaCarousel slides={SLIDES} options={OPTIONS} />
            </div>
            <div className='top-[-30px] left-0 absolute w-full h-[300px] bg-[#F2F2F7] z-0'></div>
        </section>
    )
}
