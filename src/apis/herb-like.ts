import instance from "../config/axios"


/** herb 좋아요 조회 */
export const getCountHerbLikeFetch = (url: string) => {
    return instance.get(url)
}

/** herb 좋아요 추가 */
export const createHerbLikeFetch = (url: string) => {
    return instance.post(url)
}

/** herb 좋아요 취소*/
export const deleteHerbLikeFetch = (url: string) => {
    return instance.delete(url)
}