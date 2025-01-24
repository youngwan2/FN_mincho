


export const baseUrl = 'http://localhost:8080/api/v1'


export const apiRoutes = {
    auth: {
        login: baseUrl + '/users/login',
        logout: baseUrl + '/users/logout',
        register: baseUrl + '/users/register',
        check: baseUrl + '/users/register/duplicate-check',
    },
    user: {
        profile: baseUrl + '/users/me',
        getById: baseUrl + '/users/:userId',
        update: baseUrl + '/users/:userId',
        delete: baseUrl + '/users/:userId',
    },

}