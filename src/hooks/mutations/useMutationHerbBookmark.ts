import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../config/keys";
import { Bookmark } from "../../types/bookmark.types";
import { createHerbBookmark, deleteHerbBookmark } from "../../service/bookmark";
import { toast } from "react-toastify";


/** 북마크 추가 */
export function useCreateHerbBookmarkMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ bookmark, herbId }: { bookmark: Bookmark, herbId: number }) => {
            return createHerbBookmark(bookmark, herbId)
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.herbBookmark.update(variables.herbId) })
        },
        onError: (error) => {
            // 에러가 발생했을 때 처리 (예: 에러 메시지 표시 등)
            toast.error(error.message)
        }
    })
}

/** 북마크 삭제 */
export function useDeleteHerbBookmarkMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (herbId: number) => {
            return deleteHerbBookmark(herbId)
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.herbBookmark.update(variables) })
        },
        onError: (error) => {
            // 에러가 발생했을 때 처리 (예: 에러 메시지 표시 등)
            console.error('Error adding todo:', error)
        }
    })
}
