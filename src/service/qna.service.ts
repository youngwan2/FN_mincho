import {
    getQnaListFetch,
    getQnaByIdFetch,
    createQnaFetch,
    updateQnaFetch,
    deleteQnaFetch,
    getMyQnaListFetch,
    getUserQnaListFetch,
    getQnaCategoriesFetch
} from "../apis/qna.api";

/** QnA 전체 조회 */
export const getQnaList = async (page: number, size: number, condition?: { keyword?: string, searchType?: string, fromDate?: string, toDate?: string, categoryId?: number }) => {
    return await getQnaListFetch(page, size, condition);
}

/** QnA 단일 조회 */
export const getQnaById = async (qnaId: number) => {
    return await getQnaByIdFetch(qnaId);
}

/** QnA 생성 */
export const createQna = async (formData: FormData) => {
    return await createQnaFetch(formData);
}

/** QnA 수정 */
export const updateQna = async (qnaId: number, qnaData: any) => {
    return await updateQnaFetch(qnaId, qnaData);
}

/** QnA 삭제 */
export const deleteQna = async (qnaId: number) => {
    return await deleteQnaFetch(qnaId);
}

/** 내 QnA 목록 조회 */
export const getMyQnaList = async (page: number, size: number) => {
    return await getMyQnaListFetch(page, size);
}

/** 특정 유저 QnA 목록 조회 */
export const getUserQnaList = async (userId: number, page: number, size: number) => {
    return await getUserQnaListFetch(userId, page, size);
}

/** QnA 카테고리 목록 조회 */
export const getQnaCategories = async () => {
    return await getQnaCategoriesFetch();
}
