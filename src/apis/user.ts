import { apiRoutes } from "../config/api"
import instance from "../config/axios"
import { AxiosError } from "axios"
import { Profile } from "../types/user.types"
import { UpdatePasswordRequest } from "../types/auth.types"
import { showToast } from "../components/toast/CustomToast"


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


/** 비밀번호 변경 요청 */
export const updatePasswordFetch = async (
    passwordData: UpdatePasswordRequest
) => {
    try {
        const response = await instance.patch(apiRoutes.user.updatePassword, passwordData);

        // 200~299: 성공
        if (response.status > 199 && response.status < 300) {
            showToast.success('비밀번호가 성공적으로 변경되었습니다.');
        }
        if (response.status > 399) {
            throw new AxiosError("잘못된 요청입니다.")
        }

        return true;
    } catch (error) {
        if (error instanceof AxiosError) {
            // 예외 상태 코드별 처리
            throw new AxiosError(error.response?.data.message)
        }
    }
};
