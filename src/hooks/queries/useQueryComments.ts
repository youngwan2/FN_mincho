import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "../../config/keys"
import { getComments } from "../../service/comment"
import { GetCommentFetchParams } from "../../types/comment.types"

/** 유저 댓글 조회 */
export const useCommentGetQuery = ({ page, size, sortby, postId }: GetCommentFetchParams) => {

    const { data, isLoading, isError, status } = useQuery({
        queryKey: queryKeys.comments.getAll({page, size, sortby, postId}),
        queryFn: () => getComments({ page, size, sortby, postId })
    })

    const commentInfo = data?.data?.data ?? []


    return { commentInfo, isLoading, isError, status }

}