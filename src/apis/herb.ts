import axios from "axios"
// import instance from "../config/axios"



/** herb 정보 조회 요청 */
export const getHerbsFetch = (url: string) => {
    return axios.get(url)
}

/** herb 세부 정보 조회 요청 */
export const getHerbDetailFetch = (url: string) => {
    return axios.get(url)
}

/** herb 세부 정보 조회 요청(추천 약초) */
export const getHerbsRandomFetch = (url: string) => {
    return axios.get(url)
}

/** 이달의 개화약초 */
export const getHerbsBloomingFetch = (url: string) => {
    return axios.get(url)
}

/** 추천 약초 */
export const getHerbRecommendFetch = (url: string) => {
    return axios.get(url)
}

/** 사람들이 많이 찾는 약초 */
export const getHerbMostViewFetch = (url: string) => {
    return axios.get(url)
}

