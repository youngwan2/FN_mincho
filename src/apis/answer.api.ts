import instance from '@/config/axios';
import { apiRoutes } from '../config/api';

// 답변 생성
export const createAnswerFetch = async (qnaId: number, formData: FormData) => {
    const response = await instance.post(apiRoutes.qna.answer.create(qnaId), formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

// 답변 수정
export const updateAnswerFetch = async (answerId: number, answerData: any) => {
    const response = await instance.patch(apiRoutes.qna.answer.update(answerId), answerData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

// 답변 삭제
export const deleteAnswerFetch = async (answerId: number) => {
    const response = await instance.delete(apiRoutes.qna.answer.delete(answerId));
    return response.data;
};

// 답변 채택
export const adoptAnswerFetch = async (answerId: number) => {
    const response = await instance.post(apiRoutes.qna.answer.adopt(answerId));
    return response.data;
};
