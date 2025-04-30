import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { queryKeys } from "../../config/keys"
import { getHerbBlooming, getHerbDetail, getHerbMostView, getHerbRandom, getHerbRecommend, getHerbs } from "../../service/herb"
import { HerbDetail, HerbSearchCondition, RecommendHerbResponse } from "../../types/herb.types"



/** 허브 전체 정보 */
export const useHerbsGetQuery = (size: number, condition: HerbSearchCondition) => {

    const {
        status,
        data,
        error,
        isError,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery({
        queryKey: queryKeys.herbs.getAll(0, size, condition),
        queryFn: ({ pageParam }) => getHerbs(pageParam, size, condition),
        initialPageParam: 0,
        // getPreviousPageParam: (firstData: any) => firstData.previousId ?? undefined,
        getNextPageParam: (lastData: any) => lastData.nextPage ?? undefined
    })


    const flattedData = data?.pages ? data.pages.map((page) => page.herbs).flat() : []
    const totalCount: number = data?.pages ? data.pages[0].totalCount : 0

    return {
        status,
        herbs: flattedData,
        totalCount,
        error,
        isError,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    }
}

/** 허브 세부 정보 */
export const useHerbDetailGetQuery = (herbId: number) => {

    const { data, isPending, isError, status } = useQuery({
        queryKey: queryKeys.herbs.getById(herbId),
        queryFn: () => getHerbDetail(herbId)
    })
    const herb: HerbDetail = data?.data ?? []
    return { herb, isLoading: isPending, isError, status }
}


/** 허브 랜덤 정보 */
export const useHerbRandomGetQuery = (herbId: number) => {

    const { data, isPending, isError, status } = useQuery({
        queryKey: queryKeys.herbs.getRandom(herbId),
        queryFn: () => getHerbRandom(herbId)
    })


    const herbs = data?.data ?? []
    return { herbs, isPending, isError, status }

}

/** 이달의 개화 약초 */
export const useHerbBloomingGetQuery = (month: string) => {

    const { data, isPending, isError, status } = useQuery({
        queryKey: queryKeys.herbs.getMonth(month),
        queryFn: () => getHerbBlooming(month)
    })

    const herbs = data?.data ?? []
    return { herbs, isLoading: isPending, isError, status }

}

/** 약초 추천 */
export const useHerbRecommendGetQuery = (message: string) => {

    const { data, isLoading, isError, status, isSuccess } = useQuery({
        queryKey: queryKeys.herbs.getRecommend(message),
        queryFn: () => getHerbRecommend(message),
        enabled: message.length >= 4 ? true : false
    })

    const recommendList: RecommendHerbResponse = data ?? []
    return { recommendList, isLoading, isError, status, isSuccess }

}




/** 사람들이 많이 찾은 약초 */

export const useHerbMostViewGetQuery = () => {

    const { data, isLoading, isError } = useQuery({
        queryKey: queryKeys.herbs.getRealtimeMostView(),
        queryFn: () => getHerbMostView(),
        refetchInterval: 5000,
    })


    const herbs: { id: number, herbName: string, viewCount: number }[] = data?.data ?? []
    return { herbs, isLoading, isError }
}

