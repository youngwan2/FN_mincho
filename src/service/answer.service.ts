import {
    createAnswerFetch,
    updateAnswerFetch,
    deleteAnswerFetch,
    adoptAnswerFetch
} from "../apis/answer.api";

// 답변 생성
export const createAnswer = async (qnaId: number, formData: FormData) => {
    return await createAnswerFetch(qnaId, formData);
};

// 답변 수정
export const updateAnswer = async (qnaId: number, answerId: number, answerData: any) => {
    return await updateAnswerFetch(qnaId, answerId, answerData);
};

// 답변 삭제
export const deleteAnswer = async (qnaId: number, answerId: number) => {
    return await deleteAnswerFetch(qnaId, answerId);
};

// 답변 채택
export const adoptAnswer = async (qnaId: number, answerId: number) => {
    return await adoptAnswerFetch(qnaId, answerId);
};
