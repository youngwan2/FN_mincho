import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryKeys } from "../../config/keys";
import { updatePostLike } from "../../service/post";

import { handleError } from "../../config/error";



/** 게시글 좋아요 토글 */
export function useTogglePostLikeMutation(postId: number) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (postId: number) => {
            return updatePostLike(postId)
        },
        onSuccess: () => {
            toast.info("좋아요를 추가하였습니다.")
            queryClient.invalidateQueries({ queryKey: queryKeys.postLike.update(postId) })
            queryClient.invalidateQueries({ queryKey: queryKeys.statistics.getAll(), exact: false })
        },
        onError(error) {
            handleError(error)
        },
    })
}
