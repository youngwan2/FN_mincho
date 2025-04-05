


export interface GetCommentFetchParams {
    page: number,
    size: number,
    sortby: string,
    postId: number
}


/** 댓글 */
export interface Comment {
    id: number
    contents: string
    postId: number
    level: number
    isDeleted: boolean
    nickname: string | null
    createdAt: string;
    updatedAt: string
    isMine:boolean
    replies: Comment[]

}


/** 댓글 정보 */
export interface CommentInfo {
    comments: Comment[]
    totalCount: number
}

/** 댓글 추가 */
export interface CommentCreateRequest {
    contents: string
    parentCommentId: number | null
}

/** 댓글 수정*/
export interface CommentUpdateRequest {
    contents: string
}