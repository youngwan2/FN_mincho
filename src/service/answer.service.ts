import {
    createAnswerFetch,
    updateAnswerFetch,
    deleteAnswerFetch,
    adoptAnswerFetch
} from "../apis/answer.api";

// 답변 생성
export const createAnswer = async (qnaId: number, answerData: any) => {
    return await createAnswerFetch(qnaId, answerData);
};

// 답변 수정
export const updateAnswer = async (answerId: number, answerData: any) => {
    return await updateAnswerFetch(answerId, answerData);
};

// 답변 삭제
export const deleteAnswer = async (answerId: number) => {
    return await deleteAnswerFetch(answerId);
};

// 답변 채택
export const adoptAnswer = async (answerId: number) => {
    return await adoptAnswerFetch(answerId);
};
