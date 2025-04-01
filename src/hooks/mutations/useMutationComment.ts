import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../config/keys";
import { createComment, updateComment } from "../../service/comment";
import { CommentRequest } from "../../types/comment.types";
import { toast } from "react-toastify";



/** 댓글 추가 */
export function useCreatePostMutation(postId: number, sortby: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ comment }: { comment: CommentRequest }) => {
            return createComment(postId, comment);
        },
        onSuccess: () => {
            toast.info("댓글이 추가되었습니다.")
            queryClient.invalidateQueries({ queryKey: queryKeys.comments.update({ page: 0, size: 5, postId, sortby }) })
        }
    })
}

/** 댓글 수정 */
export function useUpdatePostMutation(postId: number, sortby: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ comment }: { comment: CommentRequest }) => {
            return createComment(postId, comment);
        },
        onSuccess: () => {
            toast.info("댓글이 수정되었습니다.")
            queryClient.invalidateQueries({ queryKey: queryKeys.comments.update({ page: 0, size: 5, postId, sortby }) })
        }
    })
}




/** 댓글 삭제 */
export function useDeletePostMutation(postId: number, sortby: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ comment }: { comment: CommentRequest }) => {
            return createComment(postId, comment);
        },
        onSuccess: () => {
            toast.info("댓글이 삭제되었습니다.")
            queryClient.invalidateQueries({ queryKey: queryKeys.comments.update({ page: 0, size: 5, postId, sortby }) })
        }
    })
}

