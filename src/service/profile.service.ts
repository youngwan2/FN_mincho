import { getProfileFetch, getProfilePublicFetch, updateProfileFetch, updateProfileImageFetch } from "@/apis/profile.api";
import { Profile } from "@/types/user.types";


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
