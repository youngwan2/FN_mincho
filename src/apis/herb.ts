import instance from "../config/axios"



/** herb 정보 조회 요청 */
export const getHerbsFetch = (url: string) => {
    return instance.get(url)
}

/** herb 세부 정보 조회 요청 */
export const getHerbDetailFetch = (url: string) => {
    return instance.get(url)
}

/** herb 세부 정보 조회 요청 */
export const getHerbsRandomFetch = (url: string) => {
    return instance.get(url)
}

/** 이달의 개화약초 */
export const getHerbsBloomingFetch = (url: string) => {
    return instance.get(url)
}