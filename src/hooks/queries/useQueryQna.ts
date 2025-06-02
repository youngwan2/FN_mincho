import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../config/keys";
import { getQnaList, getQnaById, getMyQnaList, getUserQnaList } from "../../service/qna.service";

/** QnA 전체 정보(무한 스크롤) */
export const useQnaListGetQuery = (size: number) => {
    const {
        status,
        data,
        error,
        isError,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery({
        queryKey: queryKeys.qna.getAll(0, size),
        queryFn: ({ pageParam }) => getQnaList(pageParam, size),
        initialPageParam: 0,
        getNextPageParam: (lastData: any) => lastData?.nextPage ?? undefined
    });

    const flattedData = data?.pages ? data.pages.map((page) => page.qnas || page.qnaList || page.content).flat() : [];
    const totalCount: number = data?.pages ? data.pages[0].totalCount || data.pages[0].totalElements || 0 : 0;

    return {
        status,
        qnas: flattedData,
        totalCount,
        error,
        isError,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    };
};

/** QnA 단일 정보 */
export const useQnaDetailGetQuery = (qnaId: number) => {
    const { data, isPending, isError, status } = useQuery({
        queryKey: queryKeys.qna.getById(qnaId),
        queryFn: () => getQnaById(qnaId)
    });
    const qna = data?.data ?? {};
    return { qna, isLoading: isPending, isError, status };
};

/** 내 QnA 목록 */
export const useMyQnaListGetQuery = (page: number, size: number) => {
    const { data, isLoading, isError, status } = useQuery({
        queryKey: queryKeys.qna.getMy(page, size),
        queryFn: () => getMyQnaList(page, size)
    });
    const qnas = data?.qnas || data?.qnaList || data?.content || [];
    const totalCount: number = data?.totalCount || data?.totalElements || 0;
    return { qnas, totalCount, isLoading, isError, status };
};

/** 특정 유저 QnA 목록 */
export const useUserQnaListGetQuery = (userId: number, page: number, size: number) => {
    const { data, isLoading, isError, status } = useQuery({
        queryKey: queryKeys.qna.getByUser(userId, page, size),
        queryFn: () => getUserQnaList(userId, page, size),
        enabled: !!userId,
    });
    const qnas = data?.qnas || [];
    const totalCount: number = data?.totalCount || 0;
    return { qnas, totalCount, isLoading, isError, status };
};
