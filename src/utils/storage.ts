import log from "loglevel"


export const getToken = () => {
    let hasToken = null;
    for (let i = 0; i < 5; i++) {
        hasToken = localStorage.key(i)?.includes("accessToken")
    }

    if (!hasToken) {
        return
    }
    const token = localStorage.getItem("accessToken")
    if (!token) {
        log.warn("빈 값이 반환되었습니다.")
        return null
    }
    return "Bearer " + token
}

export const setToken = (value: string) => {
    if (!value) return log.warn("값도 전달해주세요.")
    localStorage.setItem("accessToken", value)
}

export const removeToken = () => {
    localStorage.removeItem("accessToken")
}