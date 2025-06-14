import { apiRoutes } from "../config/api"
import instance from "../config/axios"
import axios, { AxiosError } from "axios"

/** QnA 전체 조회 */
export const getQnaListFetch = async (page: number, size: number, condition?: { keyword?: string, searchType?: string, fromDate?: string, toDate?: string, categoryId?: number, tag?: string }) => {
    try {
        const response = await axios.get(apiRoutes.qna.getAll(page, size, condition));
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data;
        }
    }
}

/** QnA 단일 조회 */
export const getQnaByIdFetch = async (qnaId: number) => {
    try {
        const response = await instance.get(apiRoutes.qna.getById(qnaId));
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data;
        }
    }
}

/** QnA 생성 */
export const createQnaFetch = async (formData: FormData) => {
    try {
        const response = await instance.post(apiRoutes.qna.create(), formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (response.status > 399) {
            throw new AxiosError();
        }
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data;
        }
    }
}

/** QnA 수정 */
export const updateQnaFetch = async (qnaId: number, qnaData: any) => {
    console.log(qnaId, qnaData);
    try {
        const response = await instance.patch(apiRoutes.qna.update(qnaId), qnaData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data;
        }
    }
}

/** QnA 삭제 */
export const deleteQnaFetch = async (qnaId: number) => {
    try {
        const response = await instance.delete(apiRoutes.qna.delete(qnaId));
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data;
        }
    }
}

/** 내 QnA 목록 조회 */
export const getMyQnaListFetch = async (page: number, size: number) => {
    try {
        const response = await instance.get(apiRoutes.qna.byUser(page, size));
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data;
        }
    }
}

/** 특정 유저 QnA 목록 조회 */
export const getUserQnaListFetch = async (userId: number, page: number, size: number) => {
    try {
        const response = await axios.get(apiRoutes.qna.byUserId(userId, page, size));
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data;
        }
    }
}

/** QnA 카테고리 목록 조회 */
export const getQnaCategoriesFetch = async () => {
    try {
        const response = await axios.get(apiRoutes.qna.getCategories());
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data;
        }
    }
}

