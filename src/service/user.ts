import { getProfileFetch, getUserStatsFetch, updateProfileFetch } from "../apis/user";
import { Profile } from "../types/user.types";


/** 프로필 정보 요청*/
export const getInitialProfile = async () => {
    const data = await getProfileFetch();

    return data
}

/** 프로필 수정 요청*/
export const updateProfile = async (profile: Profile) => {
    const data = await updateProfileFetch(profile);
    return data
}


/** 마이페이지| 유저 통계 */
export const getUserStats = async () => {
    const data = await getUserStatsFetch();
    return data

}