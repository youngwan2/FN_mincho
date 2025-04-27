import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../config/keys";
import { createComment, deleteComment, updateComment } from "../../service/comment";
import { toast } from "react-toastify";
import { CommentCreateRequest, CommentUpdateRequest } from "../../types/comment.types";
import { AxiosError } from "axios";



/** 댓글 추가 */
export function useCreateCommentMutation(postId: number): UseMutationResult<any, AxiosError, any> {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ comment }: { comment: CommentCreateRequest }) => {
            return createComment(postId, comment);
        },
        onSuccess: () => {
            toast.info("댓글이 추가되었습니다.")
            queryClient.invalidateQueries({ queryKey: queryKeys.comments.update(postId), exact: false })
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401 || error.response?.status === 403) {
                    toast.error("로그인 후 이용 가능합니다. ")
                }

                if (error.response?.status === 500) {
                    toast.error("현재 서버측 문제로 요청처리가 불가능합니다. 나중에 다시시도 해주세요.")
                }
            }
        }
    })
}

/** 댓글 수정 */
export function useUpdateCommentMutation(postId: number) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ commentId, comment }: { commentId: number, comment: CommentUpdateRequest }) => {
            return updateComment(commentId, comment);
        },
        onSuccess: () => {
            toast.info("댓글이 수정되었습니다.")
            queryClient.invalidateQueries({ queryKey: queryKeys.comments.update(postId), exact: false })
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401 || error.response?.status === 403) {
                    toast.error("로그인 후 이용 가능합니다. ")
                }

                if (error.response?.status === 500) {
                    toast.error("현재 서버측 문제로 요청처리가 불가능합니다. 나중에 다시시도 해주세요.")
                }
            }
        }
    })
}




/** 댓글 삭제 */
export function useDeleteCommentMutation(postId: number) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (commentId: number) => {
            return deleteComment(commentId);
        },
        onSuccess: () => {
            toast.info("댓글이 삭제되었습니다.")
            queryClient.invalidateQueries({ queryKey: queryKeys.comments.update(postId), exact: false })
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401 || error.response?.status === 403) {
                    toast.error("로그인 후 이용 가능합니다. ")
                }

                if (error.response?.status === 500) {
                    toast.error("현재 서버측 문제로 요청처리가 불가능합니다. 나중에 다시시도 해주세요.")
                }
            }
        }
    })
}

