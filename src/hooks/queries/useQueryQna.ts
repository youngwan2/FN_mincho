import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../config/keys";
import { getQnaList, getQnaById, getMyQnaList, getUserQnaList } from "../../service/qna.service";
import { QnaDetail } from "@/types/qna.types";

/** QnA 전체 정보*/
export const useQnaListGetQuery = (page: number, size: number, condition?: { keyword?: string, searchType?: string, fromDate?: string, toDate?: string }) => {
    const {
        data,
        isError,
        isLoading,
    } = useQuery({
        queryKey: queryKeys.qna.getAll(page, size, condition),
        queryFn: () => getQnaList(page, size, condition),
    });

    const qnas = data?.qnas || [];
    const totalCount = data?.totalCount || 0;


    return {
        qnas,
        totalCount,
        isError,
        isLoading,
    };
};

/** QnA 단일 정보 */
export const useQnaDetailGetQuery = (qnaId: number) => {
    const { data, isPending, isError, status } = useQuery({
        queryKey: queryKeys.qna.getById(qnaId),
        queryFn: () => getQnaById(qnaId)
    });
    const qna: QnaDetail = data?.data ?? {};
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
