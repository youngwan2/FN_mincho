import { useInfiniteQuery } from "@tanstack/react-query"
import { queryKeys } from "../../config/keys"
import { getHerbs } from "../../service/herb"



export const useHerbsGetQuery = (size: number) => {

    const {
        status,
        data,
        error,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery({
        queryKey: queryKeys.herbs.getAll(0, size),
        queryFn: ({ pageParam }) => getHerbs(pageParam, size),
        initialPageParam: 0,
        // getPreviousPageParam: (firstData: any) => firstData.previousId ?? undefined,
        getNextPageParam: (lastData: any) => lastData.nextPage ?? undefined
    })


    const flattedData = data?.pages ? data.pages.map((page) => page.herbs).flat() : []

    return {
        status,
        herbs: flattedData,
        error,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    }
}