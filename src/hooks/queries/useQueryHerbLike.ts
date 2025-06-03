import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "../../config/keys"
import { getCountHerbLike } from "../../service/herb-like.service"
import { HerbLikeMetadata } from "../../types/like.types"



/** 좋아요 상태 조회 */
export function useCountHerbLikeGetQuery(herbId: number) {
    const { data, isLoading, isError, status } = useQuery({
        queryKey: queryKeys.herbLike.getAll(herbId),
        queryFn: () => getCountHerbLike(herbId)
    })

    const herbLikeMetadata: HerbLikeMetadata = data ?? { count: 0, isLiked: false }
    return { herbLikeMetadata, isLoading, isError, status }
}

