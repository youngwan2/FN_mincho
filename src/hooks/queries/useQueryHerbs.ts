import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { queryKeys } from "../../config/keys"
import { getHerbBlooming, getHerbDetail, getHerbRandom, getHerbs } from "../../service/herb"
import { HerbSearchCondition } from "../../types/herb.types"



/** 허브 전체 정보 */
export const useHerbsGetQuery = (size: number, condition:HerbSearchCondition) => {

    const {
        status,
        data,
        error,
        isError,
        isFetching,
        isPending,
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

    return {
        status,
        herbs: flattedData,
        error,
        isError,
        isFetching,
        isPending,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    }
}

/** 허브 세부 정보 */
export const useHerbDetailGetQuery = (herbId: number) => {

    const { data, isLoading, isError, status } = useQuery({
        queryKey: queryKeys.herbs.getById(herbId),
        queryFn: () => getHerbDetail(herbId)
    })
    const herb = data?.data ?? []
    return { herb, isLoading, isError, status }
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

    const { data, isLoading, isError, status } = useQuery({
        queryKey: queryKeys.herbs.getMonth(month),
        queryFn: () => getHerbBlooming(month)
    })

    const herbs = data?.data ?? []
    return { herbs, isLoading, isError, status }

}