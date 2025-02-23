import instance from "../config/axios"



/** herb 정보 조회 요청 */
export const getHerbsFetch = (url: string) => {
    return instance.get(url)
}