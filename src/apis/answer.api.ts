import axios from '../config/axios';
import { apiRoutes } from '../config/api';

// 답변 생성
export const createAnswerFetch = async (qnaId: number, answerData: any) => {
    const response = await axios.post(apiRoutes.qna.answer.create(qnaId), answerData);
    return response.data;
};

// 답변 수정
export const updateAnswerFetch = async (answerId: number, answerData: any) => {
    const response = await axios.put(apiRoutes.qna.answer.update(answerId), answerData);
    return response.data;
};

// 답변 삭제
export const deleteAnswerFetch = async (answerId: number) => {
    const response = await axios.delete(apiRoutes.qna.answer.delete(answerId));
    return response.data;
};

// 답변 채택
export const adoptAnswerFetch = async (answerId: number) => {
    const response = await axios.post(apiRoutes.qna.answer.adopt(answerId));
    return response.data;
};
