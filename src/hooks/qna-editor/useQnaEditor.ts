import { useQnaEditorState } from './useQnaEditorState';
import { useQnaEditorImages } from './useQnaEditorImages';
import { useQnaEditorValidation } from './useQnaEditorValidation';
import { useQnaEditorSubmit } from './useQnaEditorSubmit';
import { useQnaEditorHandlers } from './useQnaEditorHandlers';
import { UseQnaEditorProps, UseQnaEditorReturn } from './types';

export function useQnaEditor({
    qnaId,
    answerId,
    initTitle = '',
    initCategoryType = '',
    initContents = '',
    initImageUrls = [],
    initTags = [],
    type = 'answer',
    isPrivate = false,
    onSubmitSuccess
}: UseQnaEditorProps): UseQnaEditorReturn {

    // 상태 관리
    const state = useQnaEditorState({
        initTitle,
        initCategoryType,
        initContents,
        initImageUrls,
        initTags,
        isPrivate
    });

    // 이미지 관련 로직
    const imageHandlers = useQnaEditorImages(state);

    // 유효성 검증 로직
    const validationHandlers = useQnaEditorValidation(state, type);

    // 폼 제출 로직
    const submitHandlers = useQnaEditorSubmit(state, qnaId, answerId, onSubmitSuccess);

    // 기타 핸들러
    const basicHandlers = useQnaEditorHandlers(state);

    // 폼 제출 핸들러
    const handleSubmit = () => {
        if (!validationHandlers.validateForm()) return;
        state.setPending(true);

        switch (type) {
            case 'answer':
                submitHandlers.handleCreateAnswer();
                break;
            case 'question':
                submitHandlers.handleCreateQuestion();
                break;
            case 'edit-question':
                submitHandlers.handleUpdateQuestion();
                break;
            case 'edit-answer':
                submitHandlers.handleUpdateAnswer();
                break;
        }
    };

    // 모든 상태 및 핸들러 반환
    return {
        title: state.title,
        setTitle: state.setTitle,
        content: state.content,
        setContent: state.setContent,
        category: state.category,
        setCategory: state.setCategory,
        tags: state.tags,
        setTags: state.setTags,
        isPrivateQuestion: state.isPrivateQuestion,
        setIsPrivateQuestion: state.setIsPrivateQuestion,
        images: state.images,
        setImages: state.setImages,
        imageUrls: state.imageUrls,
        setImageUrls: state.setImageUrls,
        previewImages: state.previewImages,
        isPending: state.isPending,
        fileInputRef: state.fileInputRef,
        handleContentChange: basicHandlers.handleContentChange,
        handleImageUpload: imageHandlers.handleImageUpload,
        handleImageDelete: imageHandlers.handleImageDelete,
        handleImageUrlDelete: imageHandlers.handleImageUrlDelete,
        handleSubmit,
        isFormValid: validationHandlers.isFormValid
    };
}
