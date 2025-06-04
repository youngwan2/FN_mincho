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
        getRecommend: (message: string) => ["message", message],
        getRealtimeMostView: () => ["herbs"]
    },
    // 프로필
    profile: {
        getAll: () => ["profile"],
        get: () => ["profile"],
        getPublic: (userId: number) => ["profile", userId],
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
        getAll: (herbId: number) => ["herbLike", herbId],
        update: (herbId: number) => ["herbLike", herbId],

    },
    // 게시글
    posts: {
        update: () => ["posts"],
        getAll: (page: number, size: number, condition: PostSearchCondition) => ["posts", page, size, condition],
        getByPostId: (postId: number) => ["posts", postId],
        getStatistics: (page: number, size: number) => ["posts", "statistics", page, size],
        byUser: (page: number, size: number, enabled: boolean) => ["posts", "user", page, size, enabled],
        byUserId: (userId: number, page: number, size: number) => ["posts", "user", userId, page, size],
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
    // 알림
    notifications: {
        getAll: (page: number, size: number) => ["notifications", page, size],
        update: () => ["notifications"],
    },    // QnA
    qna: {
        getAll: (page: number, size: number, condition?: { keyword?: string, searchType?: string, fromDate?: string, toDate?: string }) =>
            ["qna", "list", page, size, condition],
        getById: (qnaId: number) => ["qna", "detail", qnaId],
        getMy: (page: number, size: number) => ["qna", "my", page, size],
        getByUser: (userId: number, page: number, size: number) => ["qna", "user", userId, page, size],
        answer: {
            getById: (answerId: number) => ["qna", "answer", answerId],
        }
    },
    // 답변 반응 (좋아요/싫어요)
    answerReaction: {
        getCount: (answerId: number, type: string) => ["answerReaction", "count", answerId, type],
    }
}