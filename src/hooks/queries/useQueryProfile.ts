import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "../../config/keys"
import { getInitialProfile, getProfilePublic } from "../../service/profile.service"
import { Profile } from "../../types/user.types"

/** 유저 프로필 정보 */
export const useProfileGetQuery = (isAuth: boolean) => {

    const { data, isLoading, isError, status } = useQuery({
        queryKey: queryKeys.profile.get(),
        queryFn: () => getInitialProfile(),
        enabled: isAuth // 로그인 상태일 때만 쿼리 실행
    })


    const profileInfo: Profile = data?.data ?? []
    return { profileInfo, isLoading, isError, status }

}

/** 유저 프로필 정보 | 공개 */
export const useProfilePublicGetQuery = (userId: number) => {

    const { data, isLoading, isError, status } = useQuery({
        queryKey: queryKeys.profile.getPublic(userId),
        queryFn: () => getProfilePublic(userId)
    })

    const profileInfo: Profile = data ?? []

    return { profileInfo, isLoading, isError, status }
}