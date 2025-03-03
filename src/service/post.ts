import { createPostFetch, deletePostFetch, getPostDetailFetch, getPostsFetch, updatePostFetch } from "../apis/post";
import { apiRoutes } from "../config/api";
import { PostRequest, PostSearchCondition } from "../types/post.types";


/** 게시글 전체 조회 */
export const getPosts = async (page: number, size: number, condition: PostSearchCondition) => {
    const { data } = await getPostsFetch(apiRoutes.posts.getAll(page, size), condition);
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