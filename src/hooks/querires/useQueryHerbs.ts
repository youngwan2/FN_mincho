import { useInfiniteQuery } from "@tanstack/react-query"
import { queryKeys } from "../../config/keys"
import { getHerbs } from "../../service/herb"



export const useHerbsGetQuery = (size: number) => {

    return useInfiniteQuery({
        queryKey: queryKeys.herbs.getAll(0, size),
        queryFn: ({ pageParam }) => getHerbs(pageParam, size),
        initialPageParam: 0,
        // getPreviousPageParam: (firstData: any) => firstData.previousId ?? undefined,
        getNextPageParam: (lastData: any) => lastData.nextPage ?? undefined
    })
}