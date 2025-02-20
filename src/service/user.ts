import { getProfileFetch } from "../apis/user";


/** 프로필 정보 요청*/
export const getInitialProfile = async () => {
    const data = await getProfileFetch();

    return data
}