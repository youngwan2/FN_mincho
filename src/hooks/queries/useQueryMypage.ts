import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "../../config/keys"
import { getUserStats } from "../../service/user"
import { UserStats } from "../../types/user.types"



// 유저 콘텐츠 통계
export const useUserStatsGetQuery = () => {
    const { data, isPending, isError, status } = useQuery({
        queryKey: queryKeys.statistics.getAll(),
        queryFn: () => getUserStats(),
    })

    const stats: UserStats = data
    return { stats, isLoading: isPending, isError, status }
}

