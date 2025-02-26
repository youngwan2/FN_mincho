import { apiRoutes } from "../config/api"
import instance from "../config/axios"
import { AxiosError } from "axios"
import { getToken } from "../utils/storage"


/** 유저 프로필 정보 요청*/
export const getProfileFetch = async () => {

    const token = getToken();0
    try {
        const response = await instance.get(
            apiRoutes.user.profile,
            {
                headers: {
                    Authorization: `${token}`
                }
            }
        )

        if (response?.status && response.status > 399) {
            throw new AxiosError("프로필 조회에 실패하였습니다.", response.data.StatusCode || "UNKNOWN_ERROR")
        }

        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data

        } else {

        }
    }
}