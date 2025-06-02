import { createCommentFetch, deleteCommentFetch, getCommentsFetch, updateCommentFetch } from "../apis/comment.api"
import { apiRoutes } from "../config/api"
import { CommentCreateRequest, CommentUpdateRequest } from "../types/comment.types"



/** 댓글 조회 */
export const getComments = async ({ page, size, sortby, postId }: { page: number, size: number, sortby: string, postId: number }) => {
    const url = apiRoutes.comments.getAll({ page, postId, size, sortby })
    return await getCommentsFetch(url)
}


/** 댓글 추가 */
export const createComment = async (postId: number, comment: CommentCreateRequest) => {
    const url = apiRoutes.comments.create(postId, comment.parentCommentId || -999)
    return await createCommentFetch(url, comment)
}

/** 댓글 수정 */
export const updateComment = async (commentId: number, comment: CommentUpdateRequest) => {
    const url = apiRoutes.comments.update(commentId)
    return await updateCommentFetch(url, comment)
}

/** 댓글 삭제 */
export const deleteComment = async (commentId: number) => {
    const url = apiRoutes.comments.delete(commentId)
    return await deleteCommentFetch(url)
}

/** 사용자별 댓글 조회 */
export const getCommentsByUser = async (page: number, size: number) => {
    const url = apiRoutes.comments.byUser(page, size)
    return await getCommentsFetch(url)
}
