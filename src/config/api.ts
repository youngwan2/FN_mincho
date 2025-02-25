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
        getAll: (page: number, size: number) => baseUrl + '/herbs?page=' + page + '&size=' + size,
        getById: (herbId: number) => baseUrl + `/herbs/${herbId}`,
        getRandom: (herbId: number) => baseUrl + `/herbs/${herbId}/random`,
        create: baseUrl + '/herbs',
        update: (herbId: number) => baseUrl + `/herbs/${herbId}`,
        delete: (herbId: number) => baseUrl + `/herbs/${herbId}`,
        getByMonth:(month:string)=> baseUrl + `/herbs/blooming?month=${month}`

    },
    community: {
        post: {
            get: (page: number, size: number) => baseUrl + '/community/posts?page=' + page + '&size=' + size,
            getById: (herbId: number) => baseUrl + `/community/posts/${herbId}`,
            create: baseUrl + '/community/posts',
            update: (postId: number) => baseUrl + `/community/posts/${postId}`,
            delete: (postId: number) => baseUrl + `/community/posts/${postId}`,
        }
    },
} as const