import instance from "../config/axios"


/** 허브 북마크 조회 */
export const getHerbBookmarkFetch = (url: string) => {
    return instance.get(url)
}

/**  허브 북마크 추가 */
export const createHerbBookmarkFetch = (url: string, bookmark: { herbName: string, url: string }) => {
    return instance.post(url, bookmark)
}

/** 허브 북마크 삭제 */
export const deleteHerbBookmarkFetch = (url: string) => {
    return instance.delete(url)
}


/**게시글에 따른 북마크 개수 조회 */
export const getCountHerbBookmarkFetch = (url: string) => {
    return instance.get(url)
}