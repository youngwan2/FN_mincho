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
        getByMonth: (month: string) => baseUrl + `/herbs/blooming?month=${month}`

    },
    herbBookmark: {
        getAll: (page: number, size: number) => baseUrl + `/users/me/herbs/herb-bookmarks?page=${page}&size=${size}`,
        create: (herbId: number) => baseUrl + `/users/me/herbs/${herbId}/herb-bookmarks`,
        delete: (herbId: number) => baseUrl + `/users/me/herbs/${herbId}/herb-bookmarks`,
        countByHerb: (herbId: number) => baseUrl + `/herbs/${herbId}/herb-bookmarks/count`,
        countByUser: () => baseUrl + `/users/me/herbs/herb-bookmarks/count`
    },
    herbLike: {
        count: (herbId: number) => baseUrl + `/herbs/${herbId}/likes`,
        create: (herbId: number) => baseUrl + `/users/me/herbs/${herbId}/likes`,
        delete: (herbId: number) => baseUrl + `/users/me/herbs/${herbId}/likes`,
    },
    // page=0&size=15&category=free&sort=id&order=desc&query=
    posts: {
        getAll: (page: number, size: number, condition: PostSearchCondition) => {
            return baseUrl + '/community/posts?page=' + page +
                '&size=' + size +
                '&category=' + condition.category +
                '&order=' + condition.order+
                '&sort=' + condition.sort+
                '&query=' + condition.query

        },
        getById: (postId: number) => baseUrl + `/community/posts/${postId}`,
        create: baseUrl + '/community/posts',
        update: (postId: number) => baseUrl + `/community/posts/${postId}`,
        delete: (postId: number) => baseUrl + `/community/posts/${postId}`,
        statistics: () => baseUrl + `/community/statistics/posts`
    },
    postLike: {
        update: (postId:number)=> baseUrl + `/community/posts/${postId}/like`
    }

} as const