import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "../../config/keys"
import { getPostDetail, getPosts, getPostsByUser, getPostByUserId, getPostStatistics } from "../../service/post.service"
import { MypagePost, Post, PostDetail, PostSearchCondition, PostStatistics, UserPostInfo } from "../../types/post.types"


// 게시글 전체 조회
export const usePostsGetQuery = (page: number, size: number, condition: PostSearchCondition) => {
    const { data, isPending, isError, status } = useQuery({
        queryKey: queryKeys.posts.getAll(page, size, condition),
        queryFn: () => getPosts(page, size, condition),
        retry: 0,
    })
    const postInfo = data ?? []
    const posts: Post[] = postInfo.posts ?? []
    const totalCount = postInfo.totalCount ?? 0
    return { posts, totalCount, isLoading: isPending, isError, status }
}

// 게시글 상세 조회
export const usePostDetailGetQuery = (postId: number) => {

    const { data, isLoading, isError, status } = useQuery({
        queryKey: queryKeys.posts.getByPostId(postId),
        queryFn: () => getPostDetail(postId)
    })
    const post: PostDetail = data?.data ?? []
    return { post, isLoading, isError, status }
}

/**
 * 사용자가 지정한 페이지와 크기에 따라 카테고리별로 게시물 통계를 조회합니다.
 * 
 * @param page 페이지 번호
 * @param size 페이지 크기
 * @returns 게시물 통계 및 로딩 상태를 포함한 객체
 */
export const usePostStatisticsGetQuery = (page: number, size: number) => {
    const { data, isPending, isError, status } = useQuery({
        queryKey: queryKeys.posts.getStatistics(page, size),
        queryFn: () => getPostStatistics()
    })
    const categoryInfos: PostStatistics[] = data?.data?.data ?? []
    return { categoryInfos, isLoading: isPending, isError, status }
}

/**
 * 사용자별 게시글 조회
 * 
 * @param userId 유저 ID
 * @param page 페이지 번호
 * @param size 페이징 사이즈
 * @returns 
 */
export const usePostsByUserIdGetQuery = (userId: number, page: number, size: number) => {
    const { data, isPending, isError, status } = useQuery({
        queryKey: queryKeys.posts.byUserId(userId, page, size),
        queryFn: () => getPostByUserId(page, size, userId),
    })
    const postInfo: UserPostInfo = data?.data ?? []
    const posts = postInfo.posts ?? []
    const totalCount = postInfo.totalCount ?? 0
    return { posts, totalCount, isLoading: isPending, isError, status }
}

/** 마이페이지 */
// 사용자 게시글 조회
export const usePostsByUserGetQuery = (page: number, size: number, enabled: boolean) => {
    const { data, isPending, isError, status } = useQuery({
        queryKey: queryKeys.posts.byUser(page, size, enabled),
        queryFn: () => getPostsByUser(page, size),
        enabled

    })
    const posts: MypagePost[] = data?.data ?? []
    return { posts, isLoading: isPending, isError, status }
}
