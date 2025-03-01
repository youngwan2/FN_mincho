import { useHerbBookmarkCountGetQuery } from "./queries/useQueryHerbBookmark";

export default function useHerbBookmark(herbId: number) {

    // 각 게시글의 북마크 개수를 불러오는 로직
    const { data, isError, isLoading } = useHerbBookmarkCountGetQuery(herbId)

    // 북마크를 삭제 및 추가하는 로직
    const herbBookmarkCount = data?.data ?? []

    return { herbBookmarkCount, isError, isLoading }

}