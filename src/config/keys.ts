import { GetCommentFetchParams } from "../types/comment.types";
import { HerbSearchCondition } from "../types/herb.types";
import { PostSearchCondition } from "../types/post.types";


export const queryKeys = {
    // 허브 
    herbs: {
        getAll: (page: number, size: number, condition: HerbSearchCondition) => ["herbs", page, size, condition],
        getById: (herbId: number) => ["herbs", herbId],
        getRandom: (herbId: number) => ["herbs", "random", herbId],
        getMonth: (month: string) => ["herbs", "blooming", month],
        getRecommend:(message:string)=> ["message", message]
    },
    // 프로필
    profile: {
        getAll: () => ["profile"],
        get: () => ["profile"],
        update: () => ["profile"]
    },
    // 북마크
    herbBookmark: {
        getAll: (page: number, size: number) => ["herbBookmark", page, size],
        getByHerbId: (herbId: number) => ["herbBookmark", herbId],
        update: (herbId: number) => ["herbBookmark", herbId],
        byUser: (page: number, size: number) => ["herbBookmark", "user", page, size],
    },
    // 약초 좋아요
    herbLike: {
        update: (herbId: number) => ["herbLike", herbId],
        getAll: (herbId: number) => ["herbLike", herbId]
    },
    // 게시글
    posts: {
        update: () => ["posts"],
        getAll: (page: number, size: number, condition: PostSearchCondition) => ["posts", page, size, condition],
        getByPostId: (postId: number) => ["posts", postId],
        getStatistics: (page: number, size: number) => ["posts", "statistics", page, size],
        byUser: (page: number, size: number, enabled: boolean) => ["posts", "user", page, size, enabled],
    },
    // 게시글 좋아요
    postLike: {
        update: (postId: number) => ["posts", postId]
    },
    // 댓글
    comments: {
        getAll: ({ page, size, postId, sortby }: GetCommentFetchParams) => ["comments", postId, page, size, sortby],
        update: (postId: number) => ["comments", postId],
        byUser: (page: number, size: number, enabled: boolean) => ["comments", "user", page, size, enabled],
    },
    // 통계
    statistics: {
        getAll: () => ["comments", "herbBookmark", "posts"],
    },
}