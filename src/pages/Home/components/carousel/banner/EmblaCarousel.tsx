import { useEffect, useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'
import './base.css'
import './embla.css'
import { Herb } from '../../../../../types/herb.types'
import { Link } from 'react-router'

type PropType = {
  slides: Herb[]
  options?: EmblaOptionsType
  month: string
}

export default function EmblaCarousel({ slides, options, month }: PropType) {

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(options)


  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)


  // 현재 포커스된 슬라이드 인덱스 추적
  useEffect(() => {
    if (!emblaApi) return;

    // 현재 포커스된 슬라이드 인덱스 가져오기
    const getCurrentIndex = () => {
      setCurrentSlideIndex(emblaApi.selectedScrollSnap())
    };

    // 슬라이드 변경될 때마다 실행
    emblaApi.on("select", getCurrentIndex);

    // 초기 인덱스 출력
    getCurrentIndex();
  }, [emblaApi]);

  return (

    <section className="embla md:bg-primary-light-gray bg-black">
      {/* 배너의 배경 */}
      <div className='md:block hidden grayscale brightness-50 absolute left-0 top-0 w-full h-full'>
        <img src={slides[currentSlideIndex]?.imgUrl1} width={innerWidth} height={600} className='w-full h-full transition' />
      </div>
      <Link to={`/herbs/${slides[currentSlideIndex]?.id}`} className="w-full" >


        <div className="w-full">

          {/* 슬라이드 */}
          <div className="embla__viewport z-1" ref={emblaRef}>
            <div className="embla__container">
              {slides.map((herb) => (
                <div className="embla__slide " key={herb?.id}>
                  <div className="embla__slide__number w-full h-full ">
                    <img src={herb.imgUrl1} width={innerWidth} height={600} className='w-full h-full' />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 슬라이드 컨텐츠 */}
          <div className='z-50 absolute right-[15%] top-[10%]'>
            <span className='p-1 px-2 rounded-2xl bg-[#05D182] text-white'>{"'" + month + "'에 개화하는 약초"}</span>
            <h2 className='text-5xl font-bold text-white mt-3'>{slides[currentSlideIndex]?.cntntsSj || ''}
              <span className='text-3xl ml-1 text-primary-gray'>
                {`${slides[currentSlideIndex]?.hbdcNm}`}
              </span>
            </h2>
          </div>
        </div>
      </Link>

      <div className="embla__buttons">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </section>
  )
}
