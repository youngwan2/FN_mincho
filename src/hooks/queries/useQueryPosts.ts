import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "../../config/keys"
import { getPostDetail, getPosts, getPostsByUser, getPostStatistics } from "../../service/post"
import { MypagePost, PostDetail, PostSearchCondition, PostStatistics } from "../../types/post.types"


// 게시글 전체 조회
export const usePostsGetQuery = (page: number, size: number, condition: PostSearchCondition) => {
    const { data, isPending, isError, status } = useQuery({
        queryKey: queryKeys.posts.getAll(page, size, condition),
        queryFn: () => getPosts(page, size, condition),

        retry: 0,
    })
    const posts = data?.data?.posts ?? []
    return { posts, isLoading: isPending, isError, status }
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

// 게시글 통계
export const usePostStatisticsGetQuery = (page: number, size: number) => {
    const { data, isPending, isError, status } = useQuery({
        queryKey: queryKeys.posts.getStatistics(page, size),
        queryFn: () => getPostStatistics()
    })
    const categoryInfos: PostStatistics[] = data?.data?.data ?? []
    console.log(categoryInfos)
    return { categoryInfos, isLoading: isPending, isError, status }
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
