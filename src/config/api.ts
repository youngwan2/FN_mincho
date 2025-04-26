import { HerbSearchCondition } from "../types/herb.types"
import { PostSearchCondition } from "../types/post.types"

export const baseUrl = 'http://localhost:8080/api/v1'


export const apiRoutes = {
    auth: {
        login: baseUrl + '/users/login',
        logout: baseUrl + '/users/me/logout',
        register: baseUrl + '/users/register',
        checkEmail: baseUrl + '/users/register/duplicate-check',
        sendVerificationCode: baseUrl + '/users/send-verification-code',
        checkVerificationCode: baseUrl + '/users/send-verification'
    },
    user: {
        profile: baseUrl + '/users/me',
        profileImage: baseUrl + '/users/me/upload',
        getById: baseUrl + '/users/me',
        update: baseUrl + '/users/me',
        delete: baseUrl + '/users/me',
        favoriteHerb: {
            get: baseUrl + '/users/me/favorite-herbs',
            create: baseUrl + '/users/me/favorite-herbs',
            delete: (favoriteHerbId: number) => baseUrl + `/users/me/favorite-herbs/${favoriteHerbId}`
        }
    },
    herb: {
        getAll: (page: number, size: number, condition: HerbSearchCondition) => baseUrl + `/herbs?page=${page}&size=${size}&bneNm=${condition.bneNm}&month=${condition.month}&orderBy=${condition.orderBy}`,
        getById: (herbId: number) => baseUrl + `/herbs/${herbId}`,
        getRandom: (herbId: number) => baseUrl + `/herbs/${herbId}/random`,
        create: () => baseUrl + '/herbs',
        update: (herbId: number) => baseUrl + `/herbs/${herbId}`,
        delete: (herbId: number) => baseUrl + `/herbs/${herbId}`,
        getByMonth: (month: string) => baseUrl + `/herbs/blooming?month=${month}`,
        recommend: (message: string) => baseUrl + `/herbs/recommend?message=${message}`

    },
    herbBookmark: {
        getAll: (page: number, size: number) => baseUrl + `/users/me/herbs/herb-bookmarks?page=${page}&size=${size}`,
        create: (herbId: number) => baseUrl + `/users/me/herbs/${herbId}/herb-bookmarks`,
        delete: (herbId: number) => baseUrl + `/users/me/herbs/${herbId}/herb-bookmarks`,
        countByHerb: (herbId: number) => baseUrl + `/herbs/${herbId}/herb-bookmarks/count`,
        countByUser: () => baseUrl + `/users/me/herbs/herb-bookmarks/count`,
    },
    herbLike: {
        count: (herbId: number) => baseUrl + `/herbs/${herbId}/likes`,
        create: (herbId: number) => baseUrl + `/users/me/herbs/${herbId}/likes`,
        delete: (herbId: number) => baseUrl + `/users/me/herbs/${herbId}/likes`,
    },
    posts: {
        getAll: (page: number, size: number, condition: PostSearchCondition) => {
            return baseUrl + '/community/posts?page=' + page +
                '&size=' + size +
                '&category=' + condition.category +
                '&order=' + condition.order +
                '&sort=' + condition.sort +
                '&queryType=' + condition.queryType +
                '&query=' + condition.query

        },
        getById: (postId: number) => baseUrl + `/community/posts/${postId}`,
        create: () => baseUrl + '/community/posts',
        update: (postId: number) => baseUrl + `/community/posts/${postId}`,
        delete: (postId: number) => baseUrl + `/community/posts/${postId}`,
        statistics: () => baseUrl + `/community/statistics/posts`,
        byUser: (page: number, size: number) => baseUrl + `/users/me/posts?page=${page}&size=${size}`
    },
    postLike: {
        update: (postId: number) => baseUrl + `/community/posts/${postId}/likes`
    },
    comments: {
        getAll: ({ page, size, sortby, postId }: { page: number, size: number, sortby: string, postId: number }) => baseUrl + `/community/posts/${postId}/comments?page=${page}&size=${size}&sortby=${sortby}`,
        create: (postId: number, commentId: number) => baseUrl + `/community/posts/${postId}/comments/${commentId || 0}`,
        update: (commentId: number) => baseUrl + `/community/comments/${commentId}`,
        delete: (commentId: number) => baseUrl + `/community/comments/${commentId}`,
        byUser: (page: number, size: number) => baseUrl + `/users/me/comments?page=${page}&size=${size}`
    },
    statistics: {
        getAll: () => baseUrl + '/users/me/stats',
    },

} as const