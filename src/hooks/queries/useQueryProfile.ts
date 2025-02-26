import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "../../config/keys"
import { getInitialProfile } from "../../service/user"
import { Profile } from "../../types/user.types"

/** 유저 프로필 정보 */
export const useProfileGetQuery = () => {

    const { data, isLoading, isError, status } = useQuery({
        queryKey: queryKeys.profile.get(),
        queryFn: () => getInitialProfile()
    })


    const profileInfo: Profile = data?.data ?? []
    return { profileInfo, isLoading, isError, status }

}