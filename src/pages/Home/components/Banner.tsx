import EmblaCarousel from "../components/carousel/EmblaCarousel";
import { EmblaOptionsType } from 'embla-carousel'

export default function Banner() {

    const OPTIONS: EmblaOptionsType = { dragFree: true }
    const SLIDE_COUNT = 5
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

    return (
        <div className="h-[658px] w-full relative">
            
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
            <div
                className="absolute bottom-0 left-[50%] translate-x-[-50%] z-10">
                <svg width="1440" height="101" viewBox="0 0 1440 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 12.9841L60 20.3612C120 27.7382 240 42.4923 360 42.4923C480 42.4923 600 27.7382 720 16.7998C840 5.86145 960 -1.5156 1080 0.265067C1200 2.04574 1320 12.9841 1380 18.5805L1440 24.1769V101H1380C1320 101 1200 101 1080 101C960 101 840 101 720 101C600 101 480 101 360 101C240 101 120 101 60 101H0V12.9841Z" fill="white" />
                </svg>
            </div>
        </div>
    )
}