import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../config/keys";
import { toast } from "react-toastify";
import { createPost, deletePost, updatePost } from "../../service/post";
import { PostRequest } from "../../types/post.types";


/** 게시글 추가 */
export function useCreatePostMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ post }: { post: PostRequest }) => {
            return createPost(post);
        },
        onSuccess: () => {
            toast.info("게시글을 추가하였습니다.")
            queryClient.invalidateQueries({ queryKey: queryKeys.posts.getAll(0, 5) })
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
            toast.info("게시글을 삭제하였습니다.")
            queryClient.invalidateQueries({ queryKey: queryKeys.posts.getAll(0, 5) })
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
            queryClient.invalidateQueries({ queryKey: queryKeys.posts.getAll(0, 5) })
        }
    })
}
