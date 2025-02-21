import { toast } from "react-toastify"
import { apiRoutes } from "../config/api"
import instance from "../config/axios"
import { AxiosError } from "axios"
import { getToken } from "../utils/storage"


/** 유저 프로필 정보 요청*/
export const getProfileFetch = async () => {

    const token = getToken();
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
            toast.error(response.status + ": 프로필 조회에 실패하였습니다.")
            throw new AxiosError("프로필 조회에 실패하였습니다.", response.data.StatusCode || "UNKNOWN_ERROR")
        }

        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            toast.error("에러: " + error.response?.data.message)
            return error.response?.data

        } else {
            toast.error("500: 네트워크 문제로 요청에 실패하였습니다.")

        }
    }
}