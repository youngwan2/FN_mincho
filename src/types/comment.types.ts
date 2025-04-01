


export interface GetCommentFetchParams {
    page: number,
    size: number,
    sortby: string,
    postId: number
}


export interface Comment {
    comment:string
}

export interface CommentRequest {
    comment:string
}