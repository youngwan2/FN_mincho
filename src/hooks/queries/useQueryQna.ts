import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../config/keys";
import { getQnaList, getQnaById, getMyQnaList, getUserQnaList, getQnaCategories } from "../../service/qna.service";
import { QnaCategory, QnaDetail } from "@/types/qna.types";

/** QnA 전체 정보*/
export const useQnaListGetQuery = (page: number, size: number, condition?: { keyword?: string, searchType?: string, fromDate?: string, toDate?: string, categoryId?: number, tag?: string }) => {
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
        queryFn: () => getQnaById(qnaId),
        enabled: !!qnaId,
    });
    const qna: QnaDetail = data || {};
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

/** QnA 카테고리 목록 조회 */
export const useQnaCategoriesQuery = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: queryKeys.qna.getCategories(),
        queryFn: () => getQnaCategories(),
    });

    const categories: QnaCategory[] = data?.success ? data.data : [];

    // 기본 카테고리 (API 실패 시 폴백)
    const defaultCategories: QnaCategory[] = [
        {
            "id": 1,
            "name": "약초 활용법",
            "description": "약초의 다양한 활용 방법에 대한 질문"
        },
        {
            "id": 2,
            "name": "약초 식별",
            "description": "약초 종류 식별 및 특성에 관한 질문"
        },
        {
            "id": 3,
            "name": "약초 재배",
            "description": "약초 재배 방법 및 환경에 관한 질문"
        },
        {
            "id": 4,
            "name": "약초 효능",
            "description": "약초의 효능 및 약리적 특성에 관한 질문"
        },
        {
            "id": 5,
            "name": "약초 레시피",
            "description": "약초를 활용한 요리, 차, 팅크 등의 레시피 관련 질문"
        },
        {
            "id": 6,
            "name": "약초 약용",
            "description": "약초의 약용 활용에 관한 질문"
        },
        {
            "id": 7,
            "name": "기타",
            "description": "기타 약초 관련 질문"
        }
    ]

    return {
        categories: categories.length > 0 ? categories : defaultCategories,
        isLoading,
        isError
    };
};
