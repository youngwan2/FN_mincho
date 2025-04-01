import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "../../config/keys"
import { getComments } from "../../service/comment"
import { GetCommentFetchParams } from "../../types/comment.types"

/** 유저 댓글 조회 */
export const useProfileGetQuery = ({ page, size, sortby, postId }: GetCommentFetchParams) => {

    const { data, isLoading, isError, status } = useQuery({
        queryKey: queryKeys.profile.get(),
        queryFn: () => getComments({ page, size, sortby, postId })
    })


    const commentInfo = data?.data ?? []
    return { commentInfo, isLoading, isError, status }

}