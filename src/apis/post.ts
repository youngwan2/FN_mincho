import instance from "../config/axios"
import { PostRequest, PostSearchCondition } from "../types/post.types"



/** 게시글 조회 요청 */
export const getPostsFetch = (url: string, condition: PostSearchCondition) => {
    return instance.get(url, {
        data: condition
    })
}

/** 게시글 상세 조회 요청 */
export const getPostDetailFetch = (url: string) => {
    return instance.get(url)
}


/** 게시글 추가 */
export const createPostFetch = (url: string, post: PostRequest) => {
    return instance.post(url, post)
}

/** 게시글 수정 */
export const updatePostFetch = (url: string, post: PostRequest) => {
    return instance.put(url, post)

}

/** 게시글 삭제 */
export const deletePostFetch = (url: string) => {
    return instance.delete(url)

}