import { EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'

type PropType = {
  herbImages: string[]
  options?: EmblaOptionsType
}

export default function HerbDetailEmblaCarousel({ herbImages, options }: PropType) {
  const [emblaRef, _] = useEmblaCarousel(options, [Autoplay()])



  return (
    <section className="w-full h-[380px] relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5 ">
          {herbImages.map((src) => {
            if (!src) return;
            return (
              <div className={`shrink-0 rounded-xl h-[300px] max-w-[580px] w-full`} key={src}>
                <div className="embla__slide__number">
                  <img src={src} alt={"약초 이미지"} className="w-full h-[300px] rounded-[5px]" />
                </div>
              </div>
            )
          }
          )}
        </div>
      </div>
    </section>
  )
}
