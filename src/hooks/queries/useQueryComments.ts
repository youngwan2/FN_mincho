import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "../../config/keys"
import { getComments, getCommentsByUser } from "../../service/comment.service"
import { GetCommentFetchParams, MypageComment } from "../../types/comment.types"

/** 유저 댓글 조회 */
export const useCommentGetQuery = ({ page, size, sortby, postId }: GetCommentFetchParams) => {

    const { data, isLoading, isError, status } = useQuery({
        queryKey: queryKeys.comments.getAll({ page, size, sortby, postId }),
        queryFn: () => getComments({ page, size, sortby, postId })
    })

    const commentInfo = data?.data || []

    return { commentInfo, isLoading, isError, status }

}

/** 마이페이지 */
// 사용자 게시글 조회
export const useCommentsByUserGetQuery = (page: number, size: number, enabled: boolean) => {
    const { data, isPending, isError, status } = useQuery({
        queryKey: queryKeys.comments.byUser(page, size, enabled),
        queryFn: () => getCommentsByUser(page, size),
        enabled,

    })

    const comments: MypageComment[] = data?.data ?? []
    return { comments, isLoading: isPending, isError, status }
}
