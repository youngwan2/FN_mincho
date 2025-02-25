import { getHerbsFetch, getHerbsRandomFetch } from "../apis/herb"
import { apiRoutes } from "../config/api";



/** 허브 전체 정보 */
export const getHerbs = async (page: number, size: number) => {

    const { data } = await getHerbsFetch(apiRoutes.herb.getAll(page, size));
    return data;

}

/** 허브 디테일 정보 */
export const getHerbDetail = async (herbId: number) => {
    const { data } = await getHerbsFetch(apiRoutes.herb.getById(herbId));
    return data;
}


/** 허브 랜덤 정보 */
export const getHerbRandom = async (herbId: number) => {
    const {data} = await getHerbsRandomFetch(apiRoutes.herb.getRandom(herbId));

    return data;
}