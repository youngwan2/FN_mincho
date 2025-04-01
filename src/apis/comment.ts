import instance from "../config/axios"


/** 커뮤니티 댓글 조회 */
export const getComments = (url: string) => {
    return instance.get(url)
}

/** 커뮤니티 댓글 수정 */
export const updateComment = (url: string) => {
    return instance.patch(url)

}

/** 커뮤니티 댓글 삭제 */
export const deleteComment = (url: string) => {
    return instance.delete(url)

}

