import { createPostFetch, deletePostFetch, getPostDetailFetch, getPostsFetch, getPostStatisticsFetch, updatePostFetch, updatePostLikeFetch } from "../apis/post";
import { apiRoutes } from "../config/api";
import { PostRequest, PostSearchCondition } from "../types/post.types";


/** 게시글 전체 조회 */
export const getPosts = async (page: number, size: number, condition: PostSearchCondition) => {
    const { data } = await getPostsFetch(apiRoutes.posts.getAll(page, size, condition));
    return data;
}


/** 게시글 상세 조회 */
export const getPostDetail = async (postId: number) => {
    const { data } = await getPostDetailFetch(apiRoutes.posts.getById(postId));
    return data;
}

/** 게시글 추가 */
export const createPost = async (post: PostRequest) => {
    const url = apiRoutes.posts.create
    return await createPostFetch(url, post)
}


/** 게시글 수정 */
export const updatePost = async (postId: number, post: PostRequest) => {
    const url = apiRoutes.posts.update(postId)
    return await updatePostFetch(url, post);
}

/** 게시글 삭제 */
export const deletePost = async (postId: number) => {
    const url = apiRoutes.posts.delete(postId)
    return await deletePostFetch(url);
}

/** 카테고리별 게시글 통계 */
export const getPostStatistics = async () => {
    const url = apiRoutes.posts.statistics()
    return await getPostStatisticsFetch(url)

}


/** 게시글 좋아요 수정 */
export const updatePostLike = async ( postId:number) => {
    const url = apiRoutes.postLike.update(postId)
    return await updatePostLikeFetch(url)
}