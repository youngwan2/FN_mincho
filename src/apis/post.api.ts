import axios from "axios"
import instance from "../config/axios"
import { PostRequest } from "../types/post.types"
import { getToken } from "../utils/storage"
import { apiRoutes } from "../config/api"



/** 게시글 조회 요청 */
export const getPostsFetch = (url: string) => {
    return axios.get(url)
}

/** 게시글 상세 조회 요청 */
export const getPostDetailFetch = (url: string) => {
    return axios.get(url, {
        headers: {
            "Authorization": getToken()
        },
    })
}


/** 게시글 추가 */
export const createPostFetch = (url: string, post: PostRequest) => {
    return instance.post(url, post)
}

/** 게시글 수정 */
export const updatePostFetch = (url: string, post: PostRequest) => {
    return instance.patch(url, post)

}

/** 게시글 삭제 */
export const deletePostFetch = (url: string) => {
    return instance.delete(url)

}

/** 카테고리별 게시글 통계 */
export const getPostStatisticsFetch = (url: string) => {
    return axios.get(url)

}

/** 게시글 좋아요 수정 */
export const updatePostLikeFetch = (url: string) => {
    return instance.post(url)
}


/** 사용자별 게시글 */
export const getPostsByUserFetch = (url: string) => {
    return instance.get(url)
}


/** 이미지 프리사인드 URL 생성 요청 */
export const generatePresignedUrlFetch = (imageFile: FormData) => {
    return instance.post(
        apiRoutes.posts.generatePresignedUrl(),
        imageFile,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

    )

}