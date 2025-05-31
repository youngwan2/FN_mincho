import { getLoginStatusFetch, getProfileFetch, getProfilePublicFetch, getUserStatsFetch, updatePasswordFetch, updateProfileFetch, updateProfileImageFetch } from "../apis/user";
import { UpdatePasswordRequest } from "../types/auth.types";
import { Profile } from "../types/user.types";
import { logout } from "./auth";


/** 프로필 정보 요청*/
export const getInitialProfile = async () => {
    const data = await getProfileFetch();

    return data
}

/** 프로필 정보 요청 | 공개 */
export const getProfilePublic = async (userId: number) => {
    const data = await getProfilePublicFetch(userId);
    return data
}

/** 프로필 수정 요청*/
export const updateProfile = async (profile: Profile) => {
    const data = await updateProfileFetch(profile);
    return data
}

/** 프로필 이미지 수정 요청 */
export const updateProfileImage = async (formData: FormData) => {
    const success = await updateProfileImageFetch(formData);
    return success
}


/** 마이페이지| 유저 통계 */
export const getUserStats = async () => {
    const data = await getUserStatsFetch();
    return data

}

/** 비밀번호 변경 */
export const updatePassword = async (passwordData: UpdatePasswordRequest) => {
    const success = await updatePasswordFetch(passwordData);
    if (success) {
        logout();
    }
    return success
}

/** 로그인 상태 체크 */
export const getLoginStatus = async () => {
    return await getLoginStatusFetch();

}