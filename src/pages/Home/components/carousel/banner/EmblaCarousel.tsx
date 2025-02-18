import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'
import './base.css'
import './embla.css'

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)


  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (

    <section className="embla bg-amber-100">
      <div className="bg-[url('https://picsum.photos/1240/600')] bg-cover bg-center  grayscale brightness-50 absolute left-0 top-0 w-full h-full" />

      <div className="w-full">
        {/* 슬라이드 */}
        <div className="embla__viewport z-1" ref={emblaRef}>
          <div className="embla__container">
            {slides.map((index) => (
              <div className="embla__slide" key={index}>
                <div className="embla__slide__number bg-[url('https://picsum.photos/1240/600')] bg-cover bg-center ">
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* 슬라이드 컨텐츠 */}
        <div className='z-50 absolute right-[15%] top-[10%]'>
          <span className='p-1 px-2 rounded-2xl bg-[#05D182] text-white'>3~7월</span>
          <h2 className='text-5xl font-bold text-white mt-3'>개나리</h2>
        </div>
      </div>

      <div className="embla__buttons">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </section>
  )
}

export default EmblaCarousel
