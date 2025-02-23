import { getHerbsFetch } from "../apis/herb"
import { apiRoutes } from "../config/api";



export const getHerbs = async (page: number, size: number) => {

    const {data} = await getHerbsFetch(apiRoutes.herb.getAll(page, size));
    return data;

}