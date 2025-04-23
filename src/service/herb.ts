import { getHerbRecommendFetch, getHerbsBloomingFetch, getHerbsFetch, getHerbsRandomFetch } from "../apis/herb"
import { apiRoutes } from "../config/api";
import { HerbSearchCondition } from "../types/herb.types";



/** 허브 전체 정보 */
export const getHerbs = async (page: number, size: number, condition: HerbSearchCondition) => {

    const { data } = await getHerbsFetch(apiRoutes.herb.getAll(page, size, condition));
    return data;

}

/** 허브 디테일 정보 */
export const getHerbDetail = async (herbId: number) => {
    const { data } = await getHerbsFetch(apiRoutes.herb.getById(herbId));
    return data;
}


/** 허브 랜덤 정보 */
export const getHerbRandom = async (herbId: number) => {
    const { data } = await getHerbsRandomFetch(apiRoutes.herb.getRandom(herbId));

    return data;
}

/** 이달의 개화 약초 */
export const getHerbBlooming = async (month: string) => {
    const { data } = await getHerbsBloomingFetch(apiRoutes.herb.getByMonth(month));

    return data;
}

/** 추천 약초 */
export const getHerbRecommend = async (message:string) => {
    const {data} = await getHerbRecommendFetch(apiRoutes.herb.recommend(message))

    return data;
}