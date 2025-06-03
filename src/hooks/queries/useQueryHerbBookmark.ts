import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "../../config/keys"
import { getCountHerbBookmark, getHerbBookmark, getUserHerbBookmark } from "../../service/bookmark.service"
import { BookmarkInfo, BookmarkMetadata } from "../../types/bookmark.types"



/** 북마크 목록 조회(개수 포함) */
export function useHerbBookmarkGetQuery(page: number, size: number, enabled?: boolean) {
    const { data, isLoading, isError, status } = useQuery({
        queryKey: queryKeys.herbBookmark.getAll(page, size),
        queryFn: () => getHerbBookmark(page, size),
        enabled

    })

    const bookmarkInfo: BookmarkInfo = data?.data ?? { count: 0, bookmarks: [] }

    return { bookmarkInfo, isLoading, isError, status }
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


/** 특정 사용자의 허브 북마크 목록 조회 */
export function useUserHerbBookmarkGetQuery(userId: number, page: number, size: number) {
    const { data, isLoading, isError, status } = useQuery({
        queryKey: ["herbBookmark", "user", userId, page, size],
        queryFn: () => getUserHerbBookmark(userId, page, size),
        enabled: !!userId
    })

    const bookmarkInfo: BookmarkInfo = data?.data ?? { count: 0, bookmarks: [] }

    return { bookmarkInfo, isLoading, isError, status }
}