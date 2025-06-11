import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../config/keys";
import { createHerbBookmark, deleteHerbBookmark } from "../../service/bookmark.service";
import { AxiosError } from "axios";
import { showToast } from "../../components/toast/CustomToast";
import { handleError } from "../../config/error";


/** 북마크 추가 */
export function useCreateHerbBookmarkMutation(): UseMutationResult<any, AxiosError, any> {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ bookmark, herbId }: { bookmark: { herbName: string, url: string }, herbId: number }) => {
            return createHerbBookmark(bookmark, herbId)
        },
        onSuccess: (_data) => {
            showToast.info("관심 약초에 추가하였습니다.")
            queryClient.invalidateQueries({ queryKey: ["herbBookmark"], exact: false })
            queryClient.invalidateQueries({ queryKey: queryKeys.statistics.getAll(), exact: false })
        },
        onError: (error) => {
            handleError(error)
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
            showToast.info("관심 약초를 취소하였습니다.")
            queryClient.invalidateQueries({ queryKey: queryKeys.herbBookmark.update(variables) })
            queryClient.invalidateQueries({ queryKey: queryKeys.statistics.getAll(), exact: false })
        },
        onError: (error) => {
            handleError(error)
        }
    })
}
