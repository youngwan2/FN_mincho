import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { queryKeys } from "../../config/keys"
import { getPostDetail, getPosts, getPostStatistics } from "../../service/post"
import { PostSearchCondition } from "../../types/post.types"


// 게시글 전체 조회
export const usePostsGetQuery = (page: number, size: number, condition: PostSearchCondition) => {
    const { data, isPending, isError, status } = useQuery({
        queryKey: queryKeys.posts.getAll(page, size),
        queryFn: () => getPosts(page, size, condition),
        placeholderData: keepPreviousData
    })
    console.log("게시글 목록: " + data)
    const posts = data?.data?.posts ?? []
    return { posts, isLoading: isPending, isError, status }
}

// 게시글 상세 조회
export const usePostDetailGetQuery = (postId: number) => {

    const { data, isLoading, isError, status } = useQuery({
        queryKey: queryKeys.posts.getByPostId(postId),
        queryFn: () => getPostDetail(postId)
    })
    console.log("게시글(상세): " + data)
    const posts = data?.data ?? []
    return { posts, isLoading, isError, status }
}

// 게시글 통계
export const usePostStatisticsGetQuery = (page: number, size: number) => {
    const { data, isPending, isError, status} = useQuery({
        queryKey: queryKeys.posts.getStatistics(page, size),
        queryFn: () => getPostStatistics()
    })
    const categoryInfos = data?.data?.data ?? []
    return { categoryInfos, isLoading:isPending, isError, status }
}