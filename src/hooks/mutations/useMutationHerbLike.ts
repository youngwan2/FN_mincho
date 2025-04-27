import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import { createHerbLike, deleteHerbLike } from "../../service/herb-like"
import { queryKeys } from "../../config/keys"
import { showToast } from "../../components/toast/CustomToast"
import { handleError } from "../../config/error"
import { AxiosError } from "axios"


/** 좋아요 추가 */
export function useCreateHerbLikeMutation(): UseMutationResult<any, AxiosError, any> {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (herbId: number) => {
            return createHerbLike(herbId)
        },
        onSuccess: (_data, variables) => {
            showToast.info("좋아요를 반영하였습니다.");
            queryClient.invalidateQueries({ queryKey: queryKeys.herbLike.update(variables) });
        },
        onError: (error) => {
            handleError(error);
        }
    })
}

/** 좋아요 취소 */
export function useDeleteHerbLikeMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (herbId: number) => {
            return deleteHerbLike(herbId)
        },
        onSuccess: (_data, variables) => {
            showToast.info("좋아요를 취소하였습니다.");
            queryClient.invalidateQueries({ queryKey: queryKeys.herbLike.update(variables) });
        },
        onError: (error) => {
            handleError(error);
        }
    })
}
