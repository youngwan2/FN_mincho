import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createHerbLike, deleteHerbLike } from "../../service/herb-like"
import { toast } from "react-toastify"
import { queryKeys } from "../../config/keys"




/** 좋아요 추가 */
export function useCreateHerbLikeMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (herbId: number) => {
            return createHerbLike(herbId)
        },
        onSuccess: (_data, variables) => {
            toast.info("좋아요를 반영하였습니다.")
            queryClient.invalidateQueries({ queryKey: queryKeys.herbLike.update(variables) })
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
            toast.info("좋아요를 취소하였습니다.")
            queryClient.invalidateQueries({ queryKey: queryKeys.herbLike.update(variables) })
        }
    })
}
