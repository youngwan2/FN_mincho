import {
    uploadQnaImagesFetch,
    uploadAnswerImagesFetch,
    deleteQnaImageFetch,
    deleteAnswerImageFetch
} from "../apis/qna-image.api";

/** QnA 이미지 업로드 */
export const uploadQnaImages = async (qnaId: number, formData: FormData) => {
    return await uploadQnaImagesFetch(qnaId, formData);
}

/** 답변 이미지 업로드 */
export const uploadAnswerImages = async (qnaId: number, answerId: number, formData: FormData) => {
    return await uploadAnswerImagesFetch(qnaId, answerId, formData);
}

/** QnA 이미지 삭제 */
export const deleteQnaImage = async (qnaId: number, imageId: number) => {
    return await deleteQnaImageFetch(qnaId, imageId);
}

/** 답변 이미지 삭제 */
export const deleteAnswerImage = async (answerId: number, imageId: number) => {
    return await deleteAnswerImageFetch(answerId, imageId);
}
