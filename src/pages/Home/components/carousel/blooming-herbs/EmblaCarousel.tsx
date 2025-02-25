import  { useCallback } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { Herb } from '../../../../../types/herb.types'
import { Link } from 'react-router'

type PropType = {
  herbs: Herb[]
  options?: EmblaOptionsType
}

export default function EmblaCarousel({ herbs, options }: PropType) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, [])


  return (
    <section className="w-full h-[380px] relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {herbs.map((herb, index) => (
            <div className={`${index % 2 == 0 ? 'mt-15' : ''}  md:w-[300px] w-xs ml-10  shrink-0 rounded-xl h-[300px]`} key={herb.id}>
              <div className="embla__slide__number">
                <Link to={"/herbs/" + herb.id} className="h-[450px] max-w-[330px] w-full relative rounded-[5px] overflow-hidden">
                  <div className='absolute left-0 top-0 right-0 h-[300px]'>
                    <img src={herb.imgUrl1} alt={herb.cntntsSj} className="w-full h-full rounded-[5px]" />
                  </div>
                  <div className="flex flex-col items-start p-2 px-3 h-auto absolute top-[50%] w-full z-10 bg-[rgba(0,0,0,0.3)] ">
                    <h3 className="text-[18px] text-white drop-shadow-sm">{herb.cntntsSj}</h3>
                    <span className="bg-primary-green text-white text-[12px] rounded-[3px] px-2">{herb.bneNm}</span>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
