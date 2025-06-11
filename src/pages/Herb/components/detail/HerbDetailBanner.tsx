import { useEffect, useState } from "react"

interface HerbDetailBannerProps {
    image: string
}

export default function HerbDetailBanner({ image }: HerbDetailBannerProps) {

    const [scrollY, setScrollY] = useState(0);

    const scroll = () => {
        const scrollY = window.scrollY
        setScrollY(scrollY * 0.15)

    }
    useEffect(() => {
        if(scrollY>200) return setScrollY(0)
        window.addEventListener("scroll", scroll)

        return () => {
            window.removeEventListener("scroll", scroll)
        }

    }, [scrollY])
    return (
        <>
            <div className="bg-cover w-full h-[612px] absolute left-0 top-0 z-[-1]">
                <div
                    style={{ backgroundImage: `url('${image}')`, transform: `translateY(${scrollY}px)` }}
                    className={`bg-cover w-full h-[612px] absolute left-0 top-0 z-[-1] `}>

                      <div className="w-full h-full backdrop-grayscale-90   absolute left-0 bottom-0 z-[-1]"></div>  

                </div>
                <div className=" w-full h-[150px] bg-white absolute left-0 bottom-[-20%] z-[10]"></div>
            </div>
            <div className="h-[612px]"></div>
        </>
    )
}