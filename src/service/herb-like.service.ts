import { createHerbLikeFetch, deleteHerbLikeFetch, getCountHerbLikeFetch } from "../apis/herb-like.api"
import { apiRoutes } from "../config/api"

/** 허브 좋아요 조회 */
export const getCountHerbLike = async (herbId: number) => {
    const url = apiRoutes.herbLike.count(herbId)
    const { data } = await getCountHerbLikeFetch(url);
    const meta = { count: data.count, isLiked: data.herbLiked }
    return meta
}

/** 허브 좋아요 추가 */
export const createHerbLike = async (herbId: number) => {
    const url = apiRoutes.herbLike.create(herbId)
    return await createHerbLikeFetch(url);
}

/** 허브 좋아요 삭제 */
export const deleteHerbLike = async (herbId: number) => {
    const url = apiRoutes.herbLike.delete(herbId)
    return await deleteHerbLikeFetch(url);
}
