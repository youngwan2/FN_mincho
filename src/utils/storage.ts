import log from "loglevel"


export const getToken = () => {
    if (localStorage.getItem('accessToken') == null) {
        return
    } else {
        const token = localStorage.getItem("accessToken")

        if (!token) {
            log.warn("빈 값이 반환되었습니다.")
            return null
        }
        return "Bearer " + token
    }
}

export const setToken = (value: string) => {
    if (!value) return log.warn("값도 전달해주세요.")
    localStorage.setItem("accessToken", value)
}

export const removeToken = () => {
    localStorage.removeItem("accessToken")
    document.cookie = 'refresh' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}