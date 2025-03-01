import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "../../config/keys"
import { getCountHerbBookmark, getHerbBookmark } from "../../service/bookmark"
import { BookmarkMetadata } from "../../types/bookmark.types"



/** 북마크 목록 조회 */
export function useHerbBookmarkGetQuery(page: number, size: number) {
    const { data, isLoading, isError, status } = useQuery({
        queryKey: queryKeys.herbBookmark.getAll(page, size),
        queryFn: () => getHerbBookmark(page, size)
    })

    return { data, isLoading, isError, status }
}


/** 각 허브의 북마크 목록의 개수 조회 */
export function useHerbBookmarkCountGetQuery(herbId: number) {
    const { data, isLoading, isError, status } = useQuery({
        queryKey: queryKeys.herbBookmark.update(herbId),
        queryFn: () => getCountHerbBookmark(herbId)
    })


    const bookmarkMetadata: BookmarkMetadata = data?.data?.data ?? { count: 0, isBookmarked: false }

    return { bookmarkMetadata, isLoading, isError, status }
}