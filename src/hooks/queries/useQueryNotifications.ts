import { useInfiniteQuery } from "@tanstack/react-query"
import { queryKeys } from "../../config/keys"
import { getNotifications } from "../../service/notification"
import { Notification } from "../../types/notification.types"



/** 알림 목록 조회 */
export const useNotificationGetQuery = (page: number, size: number) => {
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
        queryKey: queryKeys.notifications.getAll(page, size),
        queryFn: ({ pageParam }) => {
            return getNotifications(pageParam, size)
        },
        initialPageParam: 0,
        // getPreviousPageParam: (firstData: any) => firstData.previousId ?? undefined,
        getNextPageParam: (lastData: any) => {
            return lastData.nextPage ?? undefined
        }
    })


    const flattedData: Notification[] = data?.pages ? data.pages.map((page) => page.notifications).flat() : []
    const totalCount: number = data?.pages ? data.pages[0].totalCount : 0

    return {
        status,
        notifications: flattedData,
        totalCount,
        error,
        isError,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    }
}
