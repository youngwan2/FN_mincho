import { HerbSearchCondition } from "../types/herb.types";
import { PostSearchCondition } from "../types/post.types";


export const queryKeys = {
    // 허브 
    herbs: {
        getAll: (page: number, size: number, condition: HerbSearchCondition) => ["herbs", page, size, condition],
        getById: (herbId: number) => ["herbs", herbId],
        getRandom: (herbId: number) => ["herbs", "random", herbId],
        getMonth: (month: string) => ["herbs", "blooming", month]
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
    },
    // 좋아요
    herbLike: {
        update: (herbId: number) => ["herbLike", herbId],
        getAll: (herbId: number) => ["herbLike", herbId]
    },
    // 게시글
    posts: {
        getAll: (page: number, size: number, condition: PostSearchCondition) => ["posts", page, size, condition],
        getByPostId: (postId: number) => ["posts", postId],
        getStatistics: (page: number, size: number) => ["posts", "statistics", page, size]
    }
}