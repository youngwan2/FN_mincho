import axios, { AxiosError } from "axios";
import {
    createPostFetch,
    deletePostFetch,
    generatePresignedUrlFetch,
    getPostDetailFetch,
    getPostsByUserFetch,
    getPostsFetch,
    getPostStatisticsFetch,
    updatePostFetch,
    updatePostLikeFetch
} from "../apis/post.api";
import { apiRoutes } from "../config/api";
import { PostRequest, PostSearchCondition } from "../types/post.types";

/**
 * 게시글 전체 목록을 조회합니다.
 *
 * @param {number} page - 페이지 번호
 * @param {number} size - 페이지 크기
 * @param {PostSearchCondition} condition - 검색 조건 (카테고리, 키워드 등)
 * @param {number} [postId] - 특정 게시글 ID (선택적)
 * @returns {Promise<any>} 게시글 리스트 응답 데이터
 */
export const getPosts = async (page: number, size: number, condition: PostSearchCondition) => {
    const { data } = await getPostsFetch(apiRoutes.posts.getAll(page, size, condition));
    return data;
}

/**
 * 게시글 상세 정보를 조회합니다.
 *
 * @param {number} postId - 게시글 ID
 * @returns {Promise<any>} 게시글 상세 응답 데이터
 */
export const getPostDetail = async (postId: number) => {
    const { data } = await getPostDetailFetch(apiRoutes.posts.getById(postId));
    return data;
}

/**
 * 새 게시글을 등록합니다.
 *
 * @param {PostRequest} post - 게시글 요청 본문
 * @returns {Promise<any>} 생성된 게시글 응답
 */
export const createPost = async (post: PostRequest) => {
    const url = apiRoutes.posts.create();
    return await createPostFetch(url, post);
}

/**
 * 게시글을 수정합니다.
 *
 * @param {number} postId - 게시글 ID
 * @param {PostRequest} post - 수정할 게시글 데이터
 * @returns {Promise<any>} 수정된 게시글 응답
 */
export const updatePost = async (postId: number, post: PostRequest) => {
    const url = apiRoutes.posts.update(postId);
    return await updatePostFetch(url, post);
}

/**
 * 게시글을 삭제합니다.
 *
 * @param {number} postId - 삭제할 게시글 ID
 * @returns {Promise<any>} 삭제 결과 응답
 */
export const deletePost = async (postId: number) => {
    const url = apiRoutes.posts.delete(postId);
    return await deletePostFetch(url);
}

/**
 * 카테고리별 게시글 통계를 조회합니다.
 *
 * @returns {Promise<any>} 통계 데이터
 */
export const getPostStatistics = async () => {
    const url = apiRoutes.posts.statistics();
    return await getPostStatisticsFetch(url);
}

/**
 * 게시글의 좋아요 상태를 업데이트합니다.
 *
 * @param {number} postId - 게시글 ID
 * @returns {Promise<any>} 좋아요 업데이트 결과
 */
export const updatePostLike = async (postId: number) => {
    const url = apiRoutes.postLike.update(postId);
    return await updatePostLikeFetch(url);
}

/**
 * 특정 사용자 ID로 게시글 목록을 조회합니다. (관리자 등)
 *
 * @param {number} page - 페이지 번호
 * @param {number} size - 페이지 크기
 * @param {number} userId - 사용자 ID
 * @returns {Promise<any>} 게시글 리스트 응답
 */
export const getPostByUserId = async (page: number, size: number, userId: number) => {
    return await getPostsByUserFetch(apiRoutes.posts.byUserId(userId, page, size));
}

/**
 * 로그인된 사용자의 게시글 목록을 조회합니다. (마이페이지 등)
 *
 * @param {number} page - 페이지 번호
 * @param {number} size - 페이지 크기
 * @returns {Promise<any>} 사용자 게시글 리스트 응답
 */
export const getPostsByUser = async (page: number, size: number) => {
    const url = apiRoutes.posts.byUser(page, size);
    return await getPostsByUserFetch(url);
}

/**
 * 이미지 업로드를 위한 프리사인드 URL을 생성합니다.
 *
 * @param {FormData} formData - 파일 업로드용 FormData (filename 등 포함)
 * @returns {Promise<string|null>} 성공 시 업로드 URL, 실패 시 null 반환
 */
export const generatePresignedUrl = async (formData: FormData) => {
    try {
        const response = await generatePresignedUrlFetch(formData);

        if (response.status === 200) {
            return response.data.url;
        } else if (response.status > 399) {
            throw new AxiosError("프리사인드 URL 생성 실패");
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

/**
 * 게시글 조회수 증가
 * @param {number} postId - 게시글 ID
 * @returns {Promise<any>} 조회수 증가 결과
 */
export const increasePostView = async (postId: number) => {
    const url = apiRoutes.postView.viewUpdate(postId);
    // 조회수 증가 API는 보통 응답값이 필요 없으므로 에러만 캐치
    try {
        await axios.patch(url);
    } catch (e) {
        // 에러 무시 또는 필요시 로깅
        console.error('조회수 증가 실패', e);
    }
};
