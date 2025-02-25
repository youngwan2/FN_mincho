interface HerbDetailBannerProps {
    image: string
}

export default function HerbDetailBanner({ image }: HerbDetailBannerProps) {
    return (
        <>
        <div className="invisible w-full h-[612px]"></div>
            <div className="w-full h-[612px] absolute left-0 top-0 z-[-1]">
                <img src={image} alt="허브 배너" width={window.innerWidth} height={400} className="w-full h-full" />
            </div>
        </>
    )
}