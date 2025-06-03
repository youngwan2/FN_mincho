import { createHerbBookmarkFetch, deleteHerbBookmarkFetch, getCountHerbBookmarkFetch, getHerbBookmarkFetch } from "../apis/bookmark.api"
import { apiRoutes } from "../config/api"


/** 허브 북마크 추가 */
export const createHerbBookmark = async (bookmark: { herbName: string, url: string }, herbId: number) => {
    const url = apiRoutes.herbBookmark.create(herbId)
    return await createHerbBookmarkFetch(url, bookmark)
}

/** 허브 북마크 조회 */
export const getHerbBookmark = async (page: number, size: number) => {
    const url = apiRoutes.herbBookmark.getAll(page, size)
    return await getHerbBookmarkFetch(url)
}

/** 허브 북마크 삭제 */
export const deleteHerbBookmark = async (herbId: number) => {
    const url = apiRoutes.herbBookmark.delete(herbId)
    return await deleteHerbBookmarkFetch(url)
}

/** 허브 북마크 개수 조회 */
export const getCountHerbBookmark = async (herbId: number) => {
    const url = apiRoutes.herbBookmark.countByHerb(herbId)
    return await getCountHerbBookmarkFetch(url)
}

/** 특정 사용자의 허브 북마크 조회 */
export const getUserHerbBookmark = async (userId: number, page: number, size: number) => {
    const url = apiRoutes.herbBookmark.byUserId(userId, page, size)
    return await getHerbBookmarkFetch(url)
}