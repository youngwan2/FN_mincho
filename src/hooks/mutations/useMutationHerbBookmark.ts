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
            toast.info("관심 약초에 추가하였습니다.")
            queryClient.invalidateQueries({ queryKey: queryKeys.herbBookmark.update(variables.herbId) })
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
            toast.info("관심 약초를 취소하였습니다.")
            queryClient.invalidateQueries({ queryKey: queryKeys.herbBookmark.update(variables) })
        }
    })
}
