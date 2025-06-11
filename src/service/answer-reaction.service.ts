import { addAnswerReactionFetch, cancelAnswerReactionFetch, getAnswerReactionCountFetch } from '../apis/answer-reaction.api';
import { AnswerReactionRequest } from '../types/answer-reaction.types';

// 답변에 반응 추가 (좋아요/싫어요)
export const addAnswerReaction = async (qnaId: number, answerId: number, requestDTO: AnswerReactionRequest) => {
    return await addAnswerReactionFetch(qnaId, answerId, requestDTO);
};

// 답변에 대한 반응 취소
export const cancelAnswerReaction = async (qnaId: number, answerId: number) => {
    return await cancelAnswerReactionFetch(qnaId, answerId);
};

// 답변의 반응 개수 조회
export const getAnswerReactionCount = async (qnaId: number, answerId: number, type: string) => {
    return await getAnswerReactionCountFetch(qnaId, answerId, type);
};
