import { getLoginStatusFetch, getUserStatsFetch, updatePasswordFetch } from "../apis/user.api";
import { UpdatePasswordRequest } from "../types/auth.types";
import { logout } from "./auth.service";




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