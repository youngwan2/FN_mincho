import { createHerbBookmarkFetch, deleteHerbBookmarkFetch, getCountHerbBookmarkFetch, getHerbBookmarkFetch } from "../apis/bookmark"
import { apiRoutes } from "../config/api"
import { Bookmark } from "../types/bookmark.types"




/** 허브 북마크 추가 */
export const createHerbBookmark = async (bookmark: Bookmark, herbId: number) => {
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