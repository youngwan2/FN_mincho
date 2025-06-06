import { HerbSearchCondition } from "../types/herb.types"
import { PostSearchCondition } from "../types/post.types"

export const baseUrl = import.meta.env.MODE === 'development' ? 'http://localhost:8080/api/v1' : import.meta.env.VITE_SERVER_URL


export const apiRoutes = {
    auth: {
        login: baseUrl + '/users/login',
        logout: baseUrl + '/users/me/logout',
        register: baseUrl + '/users/register',
        checkEmail: baseUrl + '/users/register/duplicate-check',
        sendVerificationCode: (type: 'register' | 'reset') => baseUrl + '/users/send-verification-code?type=' + type,
        checkVerificationCode: (type: 'register' | 'reset') => baseUrl + '/users/send-verification?type=' + type,
        delete: baseUrl + '/users/me/entire'
    },
    user: {
        profilePublic: (userId: number) => baseUrl + `/users/${userId}/profile`,
        profile: baseUrl + '/users/me',
        profileImage: baseUrl + '/users/me/upload',
        getById: baseUrl + '/users/me',
        update: baseUrl + '/users/me',
        delete: baseUrl + '/users/me',
        updatePassword: baseUrl + '/users/me/password',
        favoriteHerb: {
            get: baseUrl + '/users/me/favorite-herbs',
            create: baseUrl + '/users/me/favorite-herbs',
            delete: (favoriteHerbId: number) => baseUrl + `/users/me/favorite-herbs/${favoriteHerbId}`
        },
        loginStatus: baseUrl + '/users/login-status'
    },
    herb: {
        getAll: (page: number, size: number, condition: HerbSearchCondition) => baseUrl + `/herbs?page=${page}&size=${size}&bneNm=${condition.bneNm}&month=${condition.month}&order=${condition.orderBy}&sort=${condition.sort}&cntntsSj=${condition.cntntsSj}`,
        getById: (herbId: number) => baseUrl + `/herbs/${herbId}`,
        getRandom: (herbId: number) => baseUrl + `/herbs/${herbId}/random`,
        create: () => baseUrl + '/herbs',
        update: (herbId: number) => baseUrl + `/herbs/${herbId}`,
        delete: (herbId: number) => baseUrl + `/herbs/${herbId}`,
        getByMonth: (month: string) => baseUrl + `/herbs/blooming?month=${month}`,
        recommend: (message: string) => baseUrl + `/herbs/recommend?message=${message}`,
        mostview: () => baseUrl + `/herbs/realtime-mostview`

    },
    herbBookmark: {
        getAll: (page: number, size: number) => baseUrl + `/users/me/herbs/herb-bookmarks?page=${page}&size=${size}`,
        create: (herbId: number) => baseUrl + `/users/me/herbs/${herbId}/herb-bookmarks`,
        delete: (herbId: number) => baseUrl + `/users/me/herbs/${herbId}/herb-bookmarks`,
        countByHerb: (herbId: number) => baseUrl + `/herbs/${herbId}/herb-bookmarks/count`,
        countByUser: () => baseUrl + `/users/me/herbs/herb-bookmarks/count`,
        byUserId: (userId: number, page: number, size: number) => baseUrl + `/users/${userId}/herbs/herb-bookmarks?page=${page}&size=${size}`
    },
    postBookmark: {
        getAll: (page: number, size: number) => baseUrl + `/users/me/posts/post-bookmarks?page=${page}&size=${size}`,
        create: (postId: number) => baseUrl + `/users/me/posts/${postId}/post-bookmarks`,
        delete: (postId: number) => baseUrl + `/users/me/posts/${postId}/post-bookmarks`,
        countByPost: (postId: number) => baseUrl + `/community/posts/${postId}/post-bookmarks/count`,
        countByUser: () => baseUrl + `/users/me/posts/post-bookmarks/count`,
    }
    ,
    herbLike: {
        count: (herbId: number) => baseUrl + `/herbs/${herbId}/likes`,
        create: (herbId: number) => baseUrl + `/users/me/herbs/${herbId}/likes`,
        delete: (herbId: number) => baseUrl + `/users/me/herbs/${herbId}/likes`,
    },
    posts: {
        getAll: (page: number, size: number, condition: PostSearchCondition) => {
            return baseUrl + '/community/posts?page=' + page +
                '&size=' + size +
                '&categoryId=' + condition.categoryId +
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
        byUser: (page: number, size: number) => baseUrl + `/users/me/posts?page=${page}&size=${size}`,
        byUserId: (userId: number, page: number, size: number) => baseUrl + `/users/${userId}/posts?page=${page}&size=${size}`,
        generatePresignedUrl: () => baseUrl + `/community/posts/images/presigned-url`,


    },
    postView: {
        base: (postId: number) => baseUrl + `/community/posts/${postId}/view`,
        getById: (postId: number) => apiRoutes.postView.base(postId),
        viewUpdate: (postId: number) => apiRoutes.postView.base(postId) // 게시글 조회수 업데이트,
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
    }, qna: {
        getAll: (page: number, size: number, condition?: { keyword?: string, searchType?: string, fromDate?: string, toDate?: string, categoryId?: number }) => {
            let url = baseUrl + `/community/qna?page=${page}&size=${size}`;

            if (condition) {
                if (condition.keyword) url += `&keyword=${encodeURIComponent(condition.keyword)}`;
                if (condition.searchType) url += `&searchType=${encodeURIComponent(condition.searchType)}`;
                if (condition.fromDate) url += `&fromDate=${condition.fromDate}`;
                if (condition.toDate) url += `&toDate=${condition.toDate}`;
                if (condition.categoryId) url += `&categoryId=${condition.categoryId}`;
            }

            return url;
        },
        getById: (qnaId: number) => baseUrl + `/community/qna/${qnaId}`,
        create: () => baseUrl + '/community/qna',
        update: (qnaId: number) => baseUrl + `/community/qna/${qnaId}`,
        delete: (qnaId: number) => baseUrl + `/community/qna/${qnaId}`,
        getCategories: () => baseUrl + '/community/qna/categories',
        byUser: (page: number, size: number) => baseUrl + `/users/me/qna?page=${page}&size=${size}`,
        byUserId: (userId: number, page: number, size: number) => baseUrl + `/users/${userId}/qna?page=${page}&size=${size}`, images: {
            upload: (qnaId: number) => baseUrl + `/community/qna/${qnaId}/images`,
            delete: (qnaId: number, imageId: number) => baseUrl + `/community/qna/${qnaId}/images/${imageId}`
        },
        answer: {
            create: (qnaId: number) => baseUrl + `/community/qna/${qnaId}/answers`,
            update: (answerId: number) => baseUrl + `/community/qna/answers/${answerId}`,
            delete: (answerId: number) => baseUrl + `/community/qna/answers/${answerId}`,
            adopt: (answerId: number) => baseUrl + `/community/qna/answers/${answerId}/adopt`,
            images: {
                upload: (qnaId: number, answerId: number) => baseUrl + `/community/qna/${qnaId}/answers/${answerId}/images`,
                delete: (answerId: number, imageId: number) => baseUrl + `/community/qna/answers/${answerId}/images/${imageId}`
            }
        }
    },
    statistics: {
        getAll: () => baseUrl + '/users/me/stats',
    },
    sse: {
        connect: () => baseUrl + `/notification/subscribe`
    },
    notifications: {
        getAll: (page: number, size: number) => baseUrl + `/notifications?page=${page}&size=${size}`,
        markAsRead: (id: number) => baseUrl + `/notifications/read/${id}`,
        deleteAllByIsRead: () => baseUrl + `/notifications/reads`,
        getUnreadStatus: () => baseUrl + `/notifications/unread-status`
    },
    answerReaction: {
        add: (answerId: number) => baseUrl + `/community/qna/answers/${answerId}/reactions`,
        cancel: (answerId: number) => baseUrl + `/community/qna/answers/${answerId}/reactions`,
        count: (answerId: number, type: string) => baseUrl + `/community/qna/answers/${answerId}/reactions/count?type=${type}`
    },
    s3: {
        upload: (url: string) => url
    }

} as const