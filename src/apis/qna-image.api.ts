import axios from '../config/axios';
import { apiRoutes } from '../config/api';

// QNA 이미지 업로드
export const uploadQnaImagesFetch = async (qnaId: number, formData: FormData) => {
    const response = await axios.patch(apiRoutes.qna.images.upload(qnaId), formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

// 답변 이미지 업로드
export const uploadAnswerImagesFetch = async (qnaId: number, answerId: number, formData: FormData) => {
    const response = await axios.patch(apiRoutes.qna.answer.images.upload(qnaId, answerId), formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

// QNA 이미지 삭제
export const deleteQnaImageFetch = async (qnaId: number, imageId: number) => {
    const response = await axios.delete(apiRoutes.qna.images.delete(qnaId, imageId));
    return response.data;
};

// 답변 이미지 삭제
export const deleteAnswerImageFetch = async (qnaId: number, answerId: number, imageId: number) => {
    const response = await axios.delete(apiRoutes.qna.answer.images.delete(qnaId, answerId, imageId));
    return response.data;
};
