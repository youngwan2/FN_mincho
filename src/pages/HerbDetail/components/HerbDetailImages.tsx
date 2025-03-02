import HerbDetailEmblaCarousel from "./carousel/EmblaCarousel";

interface HerbDetailIImagesProps {
    images: string[]
}

export default function HerbDetailImages({ images }: HerbDetailIImagesProps) {
    return (
        <div className="w-full h-[300px] flex gap-8 mt-10 relative -z-10">
            <HerbDetailEmblaCarousel herbImages={images}/>
        </div>
    )
}