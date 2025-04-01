import instance from "../config/axios"
import { Comment, CommentRequest } from "../types/comment.types"


/** 커뮤니티 댓글 조회 */
export const getCommentsFetch = (url: string) => {
    return instance.get(url)
}


/** 커뮤니티 댓글 추가 */
export const createCommentFetch = (url: string, comment: Comment) => {
    return instance.post(url, comment)
}

/** 커뮤니티 댓글 수정 */
export const updateCommentFetch = (url: string, comment: CommentRequest) => {
    return instance.patch(url, comment)

}

/** 커뮤니티 댓글 삭제 */
export const deleteCommentFetch = (url: string) => {
    return instance.delete(url)

}

