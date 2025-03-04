import { apiRoutes } from "../config/api"
import instance from "../config/axios"
import { AxiosError } from "axios"
import { Profile } from "../types/user.types"


/** 유저 프로필 정보 요청*/
export const getProfileFetch = async () => {

    try {
        const response = await instance.get(
            apiRoutes.user.profile
        )
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data

        }
    }
}


/** 프로필 정보 수정 */
export const updateProfileFetch = async (profile: Profile) => {
    try {
        const response = await instance.patch(
            apiRoutes.user.profile,
            profile
        )

        const data = response.data;
        console.log(data)

    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data

        }
    }
}


/** 사용자가 작성한 게시글 목록*/