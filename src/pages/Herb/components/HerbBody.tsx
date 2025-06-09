import { Link } from "react-router";
import { Herb } from "../../../types/herb.types";
import HerbHeader from "./HerbHeader";
import HerbItem from "./HerbItem";
import HerbList from "./HerbList";
import HerbSort from "./HerbSort";
import HerbTitle from "./HerbTitle";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useState } from "react";
import noImage from '../../../assets/noImage.png'

interface HerbBodyProps {
    herbs: Herb[];
    totalCount?: number;
    isLoading?: boolean;
}

export default function HerbBody({ herbs, totalCount = 0, isLoading = false }: HerbBodyProps) {

    const [loaded, setLoaded] = useState<Record<number, boolean>>({}) // 키의 타입이 number 라면 그 값의 타입을 boolean으로 설정한다


    /** 이미지 로딩 완료 시 상태 변경 */
    function handleLoaded(index: number) {
        setLoaded(perv => ({ ...perv, [index]: true }))
    }


    // 스켈레톤 아이템 렌더링 함수
    const renderSkeletonItems = () => {
        return Array(8).fill(0).map((_, index) => (
            <HerbItem key={`skeleton-${index}`}>
                <div className="h-auto">
                    <div>
                        <Skeleton height={200} className="w-full rounded-[5px]" />
                    </div>
                    <div className="flex flex-col items-start p-2 h-auto">
                        <Skeleton width={120} height={22} className="mb-1" />
                        <Skeleton width={100} height={16} className="mb-2" />
                        <Skeleton width={60} height={20} className="rounded-[3px]" />
                    </div>
                </div>
            </HerbItem>
        ));
    };

    return (
        <div className="mt-30">
            <HerbHeader
                title={
                    <HerbTitle elementName={"h2"} className="text-[#333] text-3xl mb font-black flex items-center">
                        총 {totalCount || 0}개의 약초
                    </HerbTitle>}
            />
            <HerbList>
                {isLoading ? renderSkeletonItems() :
                    herbs.slice(0, herbs.length).map((herb, index) => {
                        return (
                            <HerbItem key={herb.id}>
                                <Link to={"" + herb.id} className="h-auto">
                                    <div className="w-full h-full max-h-[240px] grayscale-70 hover:grayscale-0 transition overflow-hidden">
                                        {
                                            // 이미지 로드 전 까지 보여줄 플레이스 홀더(스켈레톤)
                                            !loaded[index] && <Skeleton className="h-[240px] rounded-2xl" />
                                        }
                                        <img
                                            src={herb.imgUrl1}
                                            alt={herb.cntntsSj}
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = noImage;

                                            }}
                                            className={`${!loaded[index] ? 'hidden opacity-0' : 'opacity-100 block'}  w-full h-[250px] rounded-[5px] hover:scale-105 transition-transform`}
                                            onLoad={() => handleLoaded(index)}
                                            height={250}
                                            width={250}
                                        />
                                    </div>
                                    <div className="flex flex-col items-start p-2 h-auto mt-3">
                                        <div className="flex items-center">
                                            <strong className="text-3xl">{herb.cntntsSj}

                                            </strong>
                                            <span className="pl-2 text-2xl">{herb.hbdcNm}</span>
                                        </div>

                                        <span className="bg-hover-primary-green text-white text-[15px] rounded-[3px] px-2 mt-2">{herb.bneNm}</span>
                                    </div>
                                </Link>
                            </HerbItem>
                        )
                    })
                }
            </HerbList>
        </div>
    )
}