import {
    getQnaListFetch,
    getQnaByIdFetch,
    createQnaFetch,
    updateQnaFetch,
    deleteQnaFetch,
    getMyQnaListFetch,
    getUserQnaListFetch
} from "../apis/qna.api";

/** QnA 전체 조회 */
export const getQnaList = async (page: number, size: number, condition?: { keyword?: string, searchType?: string, fromDate?: string, toDate?: string }) => {
    return await getQnaListFetch(page, size, condition);
}

/** QnA 단일 조회 */
export const getQnaById = async (qnaId: number) => {
    return await getQnaByIdFetch(qnaId);
}

/** QnA 생성 */
export const createQna = async (qnaData: any) => {
    return await createQnaFetch(qnaData);
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
