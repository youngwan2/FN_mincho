import axios from '@/config/axios';
import { apiRoutes } from '@/config/api';
import { AnswerReactionRequest } from '@/types/answer-reaction.types';

// 답변에 반응 추가 (좋아요/싫어요)
export const addAnswerReactionFetch = async (qnaId: number, answerId: number, requestDTO: AnswerReactionRequest) => {
    const response = await axios.post(apiRoutes.answerReaction.add(qnaId, answerId), requestDTO);
    return response.data;
};

// 답변에 대한 반응 취소
export const cancelAnswerReactionFetch = async (qnaId: number, answerId: number) => {
    const response = await axios.delete(apiRoutes.answerReaction.cancel(qnaId, answerId));
    return response.data;
};

// 답변의 반응 개수 조회
export const getAnswerReactionCountFetch = async (qnaId: number, answerId: number, type: string) => {
    const response = await axios.get(apiRoutes.answerReaction.count(qnaId, answerId, type));
    return response.data;
};
