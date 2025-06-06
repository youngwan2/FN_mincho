import { useNavigate } from 'react-router';
import { QnaEditorState, FormDataContent } from './types';
import { useCreateAnswerMutation, useUpdateAnswerMutation } from '../mutations/useMutationAnswer';
import { useCreateQnaMutation, useUpdateQnaMutation } from '../mutations/useMutationQna';
import { useUploadQnaImagesMutation, useUploadAnswerImagesMutation } from '../mutations/useMutationQnaImage';

export function useQnaEditorSubmit(
    state: QnaEditorState,
    qnaId?: number,
    answerId?: number,
    onSubmitSuccess?: () => void,
) {
    const {
        title,
        content,
        category,
        tags,
        isPrivateQuestion,
        images,
        imageUrls,
        deletedImageUrls,
        setPending
    } = state;

    const navigate = useNavigate();

    // 뮤테이션
    const createAnswerMutation = useCreateAnswerMutation();
    const createQnaMutation = useCreateQnaMutation();
    const updateQnaMutation = useUpdateQnaMutation();
    const updateAnswerMutation = useUpdateAnswerMutation(Number(qnaId));
    const uploadQnaImagesMutation = useUploadQnaImagesMutation(Number(qnaId));
    const uploadAnswerImagesMutation = useUploadAnswerImagesMutation(Number(qnaId));

    // 에디터 상태 초기화 함수
    const resetEditor = () => {
        state.setContent("");
        state.setImages([]);
        state.setPreviewImages([]);
        if (state.fileInputRef.current) state.fileInputRef.current.value = '';
    };

    // 성공 핸들러 - 질문 생성
    const handleQuestionSuccess = (qnaId?: number) => {
        setPending(false);
        // qnaId가 있으면 해당 질문으로 이동, 없으면 목록으로 이동
        navigate(qnaId ? `/community/qnas/${qnaId}` : '/community/qnas');
    };

    // 성공 핸들러 - 답변 생성/수정
    const handleAnswerSuccess = () => {
        setPending(false);
        resetEditor();
        if (onSubmitSuccess) onSubmitSuccess();
    };

    // 에러 핸들러
    const handleError = () => {
        setPending(false);
    };

    // 질문 데이터 생성 함수 (JSON)
    const createQuestionData = (): FormDataContent => {
        return {
            title,
            content,
            categoryType: category,
            tags,
            isPrivate: isPrivateQuestion
        };
    };

    // 답변 데이터 생성 함수 (JSON)
    const createAnswerData = (): FormDataContent => {
        return {
            content,
            isAdapted: false
        };
    };

    // 답변 수정 데이터 생성 함수 (JSON)
    const createAnswerUpdateData = (): FormDataContent => {
        return {
            content
        };
    };

    // 이미지를 FormData에 추가하는 유틸리티 함수
    const appendImagesToFormData = (formData: FormData) => {
        images.forEach((image) => {
            formData.append('images', image);
        });
        return formData;
    };

    // 이미지 URL과 삭제된 이미지 URL을 FormData에 추가하는 유틸리티 함수
    const appendImageUrlsToFormData = (formData: FormData) => {
        // 기존 이미지 URL 추가
        if (imageUrls.length > 0) {
            const imageUrlsBlob = new Blob([JSON.stringify(imageUrls)], { type: 'application/json' });
            formData.append('imageUrls', imageUrlsBlob);
        }

        // 삭제된 이미지 URL 추가
        if (deletedImageUrls.length > 0) {
            const deletedImageUrlsBlob = new Blob([JSON.stringify(deletedImageUrls)], { type: 'application/json' });
            formData.append('deletedImageUrls', deletedImageUrlsBlob);
        }

        return formData;
    };

    // 답변 등록 함수
    const handleCreateAnswer = () => {
        if (!qnaId) return;

        // 모든 경우에 FormData로 처리
        const formData = new FormData();

        // 답변 데이터 준비
        const answerData = createAnswerData();

        // 'answer' 파트 추가
        const answerBlob = new Blob([JSON.stringify(answerData)], { type: 'application/json' });
        formData.append('answer', answerBlob);

        // 이미지가 있는 경우 추가
        if (images.length > 0) {
            appendImagesToFormData(formData);
        }

        createAnswerMutation.mutate({
            qnaId: Number(qnaId),
            formData
        }, {
            onSuccess: handleAnswerSuccess,
            onError: handleError
        });
    };

    // 질문 등록 함수
    const handleCreateQuestion = () => {
        // 모든 경우에 FormData로 처리
        const formData = new FormData();

        // 질문 데이터 준비
        const qnaData = createQuestionData();

        // 'qna' 파트 추가
        const qnaBlob = new Blob([JSON.stringify(qnaData)], { type: 'application/json' });
        formData.append('question', qnaBlob);

        // 이미지가 있는 경우 추가
        if (images.length > 0) {
            appendImagesToFormData(formData);
        }

        createQnaMutation.mutate(formData, {
            onSuccess: () => handleQuestionSuccess(),
            onError: handleError
        });
    };

    // 질문 수정 함수
    const handleUpdateQuestion = () => {
        if (!qnaId) return;

        // 데이터 준비
        const qnaData = createQuestionData();

        // 이미지가 있거나 이미지 URL이 있는 경우 먼저 이미지 업로드 후 데이터 업로드
        if (images.length > 0 || deletedImageUrls.length > 0) {
            const formData = new FormData();

            // 이미지 추가
            appendImagesToFormData(formData);

            // 이미지 URL 및 삭제된 이미지 URL 추가
            appendImageUrlsToFormData(formData);

            // 이미지 업로드 후 데이터 업로드
            uploadQnaImagesMutation.mutate(
                formData,
                {
                    onSuccess: () => {
                        // 이미지 업로드 성공 후 데이터 업로드
                        updateQnaMutation.mutate({
                            qnaId,
                            qnaData
                        }, {
                            onSuccess: () => handleQuestionSuccess(qnaId),
                            onError: handleError
                        });
                    },
                    onError: handleError
                });
        } else {
            // 이미지 변경이 없는 경우 데이터만 업로드
            updateQnaMutation.mutate({
                qnaId,
                qnaData
            }, {
                onSuccess: () => handleQuestionSuccess(qnaId),
                onError: handleError
            });
        }
    };

    // 답변 수정 함수
    const handleUpdateAnswer = () => {
        if (!answerId || !qnaId) return;

        // 데이터 준비
        const answerData = createAnswerUpdateData();

        // 이미지가 있거나 삭제된 이미지 URL이 있는 경우 먼저 이미지 업로드 후 데이터 업로드
        if (images.length > 0 || deletedImageUrls.length > 0) {
            const formData = new FormData();

            // 이미지 추가
            appendImagesToFormData(formData);

            // 이미지 URL 및 삭제된 이미지 URL 추가
            appendImageUrlsToFormData(formData);

            // 이미지 업로드 후 데이터 업로드
            uploadAnswerImagesMutation.mutate({
                answerId: Number(answerId),
                formData
            }, {
                onSuccess: () => {
                    // 이미지 업로드 성공 후 데이터 업로드
                    updateAnswerMutation.mutate({
                        answerId,
                        answerData
                    }, {
                        onSuccess: () => handleAnswerSuccess(),
                        onError: handleError
                    });
                },
                onError: handleError
            });
        } else {
            // 이미지 변경이 없는 경우 데이터만 업로드
            updateAnswerMutation.mutate({
                answerId,
                answerData
            }, {
                onSuccess: () => handleAnswerSuccess(),
                onError: handleError
            });
        }
    };

    return {
        handleCreateAnswer,
        handleCreateQuestion,
        handleUpdateQuestion,
        handleUpdateAnswer,
        handleError,
        handleAnswerSuccess,
        handleQuestionSuccess
    };
}
