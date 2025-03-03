import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { queryKeys } from "../../config/keys"
import { getPostDetail, getPosts } from "../../service/post"
import { PostSearchCondition } from "../../types/post.types"


// 게시글 전체 조회
export const usePostsGetQuery = (page: number, size: number, condition: PostSearchCondition) => {

    const { data, isLoading, isError, status } = useQuery({
        queryKey: queryKeys.posts.getAll(page, size),
        queryFn: () => getPosts(page, size, condition),
        placeholderData: keepPreviousData
    })
    console.log("게시글: " + data)
    const posts = data?.data ?? []
    return { posts, isLoading, isError, status }
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
