import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../config/keys";
import { toast } from "react-toastify";
import { createPost, deletePost, updatePost } from "../../service/post";
import { PostRequest } from "../../types/post.types";
import { AxiosError } from "axios";


/** 게시글 추가 */
export function useCreatePostMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ post }: { post: PostRequest }) => {
            return createPost(post);
        },
        onSuccess: () => {
            toast.info("게시글을 추가하였습니다.")
            queryClient.invalidateQueries({ queryKey: queryKeys.posts.update(), exact: false })
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

/** 게시글 수정 */
export function useUpdatePostMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ postId, post }: { postId: number, post: PostRequest }) => {
            return updatePost(postId, post)
        },
        onSuccess: () => {
            toast.info("게시글을 수정하였습니다.")
            queryClient.invalidateQueries({ queryKey: queryKeys.posts.update(), exact: false })
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

/** 게시글 삭제 */
export function useDeletePostMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (postId: number) => {
            return deletePost(postId)
        },
        onSuccess: () => {
            toast.info("게시글을 삭제하였습니다.")
            queryClient.invalidateQueries({ queryKey: queryKeys.posts.update(), exact: false })
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
