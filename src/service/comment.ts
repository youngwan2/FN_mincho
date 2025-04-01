import { createCommentFetch, deleteCommentFetch, getCommentsFetch, updateCommentFetch } from "../apis/comment"
import { apiRoutes } from "../config/api"
import { CommentRequest } from "../types/comment.types"



/** 댓글 조회 */
export const getComments = async ({ page, size, sortby, postId }: { page: number, size: number, sortby: string, postId: number }) => {
    const url = apiRoutes.comments.getAll({ page, postId, size, sortby })
    return await getCommentsFetch(url)
}


/** 댓글 추가 */
export const createComment = async (postId: number, comment:CommentRequest) => {
    const url = apiRoutes.comments.update(postId)
    return await createCommentFetch(url, comment)
}

/** 댓글 수정 */
export const updateComment = async (postId: number, comment:CommentRequest) => {
    const url = apiRoutes.comments.update(postId)
    return await updateCommentFetch(url, comment)
}

/** 댓글 삭제 */
export const deleteComment = async (postId: number) => {
    const url = apiRoutes.comments.delete(postId)
    return await deleteCommentFetch(url)
}

