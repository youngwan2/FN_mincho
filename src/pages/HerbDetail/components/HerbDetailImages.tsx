interface HerbDetailIImagesProps {
    images: string[]
}

export default function HerbDetailImages({ images }: HerbDetailIImagesProps) {
    return (
        <div className="w-full h-[300px] flex gap-8 mt-10">
            {images.map((src) => {
                if(!src) return <></>
                return (
                    <img key={src} src={src} alt={"약초 이미지"} className="w-full h-full rounded-2xl" />
                )
            })}
        </div>
    )
}