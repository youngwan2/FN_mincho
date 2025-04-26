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
        return data

    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data

        }
    }
}

/** 프로필 이미지 수정 */
export const updateProfileImageFetch = async (formData: FormData) => {
    try {
        const response = await instance.patch(
            apiRoutes.user.profileImage,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }

        )

        // 업로드 성공 유무 체크
        if (response.status > 399) {
            return false
        } else {
            return true
        }

    } catch (error) {
        if (error instanceof AxiosError) {
            return false

        }
    }
}



/** 마이페이지| 유저 통계 */
export const getUserStatsFetch = async () => {
    try {
        const response = await instance.get(
            apiRoutes.statistics.getAll()
        )
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data

        }
    }
}