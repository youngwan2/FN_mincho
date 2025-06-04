import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useCreateAnswerMutation, useUpdateAnswerMutation } from './mutations/useMutationAnswer';
import { useCreateQnaMutation, useUpdateQnaMutation } from './mutations/useMutationQna';
import { useUploadQnaImagesMutation, useUploadAnswerImagesMutation } from './mutations/useMutationQnaImage';
import { showToast } from '../components/toast/CustomToast';

// 에디터 타입 정의
export type EditorType = 'question' | 'answer' | 'edit-question' | 'edit-answer';

// useQnaEditor 훅의 반환 타입 정의
export interface UseQnaEditorReturn {
    title: string;
    setTitle: (title: string) => void;
    content: string;
    setContent: (content: string) => void;
    category: string;
    setCategory: (category: string) => void;
    tags: string[];
    setTags: (tags: string[]) => void;
    isPrivateQuestion: boolean;
    setIsPrivateQuestion: (isPrivate: boolean) => void;
    images: File[];
    setImages: (images: File[]) => void;
    imageUrls: string[];
    setImageUrls: (urls: string[]) => void;
    previewImages: string[];
    isPending: boolean;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    handleContentChange: (content: string) => void;
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleImageDelete: (index: number) => void;
    handleImageUrlDelete: (index: number) => void;
    handleSubmit: () => void;
    isFormValid: () => boolean;
}

interface UseQnaEditorProps {
    qnaId?: number;
    answerId?: number;  // 답변 ID 추가
    initTitle?: string;
    initCategoryType?: string;
    initContents?: string;
    initImageUrls?: string[]; // 초기 이미지 URL 목록 추가
    type?: EditorType;
    isPrivate?: boolean;
    onSubmitSuccess?: () => void;
}

export function useQnaEditor({
    qnaId,
    answerId,
    initTitle = '',
    initCategoryType = '',
    initContents = '',
    initImageUrls = [],
    type = 'answer',
    isPrivate = false,
    onSubmitSuccess
}: UseQnaEditorProps): UseQnaEditorReturn {

    const navigate = useNavigate();
    const [title, setTitle] = useState(initTitle);
    const [content, setContent] = useState(initContents);
    const [category, setCategory] = useState(initCategoryType);
    const [tags, setTags] = useState<string[]>([]);
    const [isPrivateQuestion, setIsPrivateQuestion] = useState(isPrivate); const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>(initImageUrls); // 기존 이미지 URL 저장
    const [isPending, setPending] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // 답변 등록 mutation
    const createAnswerMutation = useCreateAnswerMutation();

    // 질문 등록 mutation
    const createQnaMutation = useCreateQnaMutation();

    // 질문 수정 mutation
    const updateQnaMutation = useUpdateQnaMutation();

    // 답변 수정 mutation
    const updateAnswerMutation = useUpdateAnswerMutation(Number(qnaId));

    // QnA 이미지 업로드 mutation
    const uploadQnaImagesMutation = useUploadQnaImagesMutation(Number(qnaId));

    // 답변 이미지 업로드 mutation
    const uploadAnswerImagesMutation = useUploadAnswerImagesMutation(Number(qnaId));



    // 컨텐츠 업데이트 핸들러
    const handleContentChange = (newContent: string) => {
        setContent(newContent);
    };

    // 이미지 업로드 핸들러
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        // 파일 크기 및 확장자 제한 설정
        const MAX_SIZE = 5 * 1024 * 1024; // 5MB
        const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

        const newImages: File[] = [];
        const newPreviewImages: string[] = [];
        setPending(true);

        let filesProcessed = 0; // 처리된 파일 개수(유효 + 무효 파일 모두 포함)
        let validFiles = 0; // 유효한 파일 개수

        // 파일 목록 순회
        Array.from(files).forEach(file => {
            // 파일 유효성 검사
            if (!ALLOWED_TYPES.includes(file.type)) {
                showToast.error(`${file.name}: 지원하지 않는 파일 형식입니다. (jpg, png, webp 만 가능)`);
                filesProcessed++;
                return;
            }

            if (file.size > MAX_SIZE) {
                showToast.error(`${file.name}: 파일 크기가 5MB를 초과합니다.`);
                filesProcessed++;
                return;
            }

            validFiles++;

            const reader = new FileReader();
            reader.onloadend = () => {
                newImages.push(file);
                newPreviewImages.push(reader.result as string);
                filesProcessed++;

                // 모든 파일이 처리된 후 상태 업데이트
                if (filesProcessed === files.length) {
                    if (validFiles > 0) {
                        setImages(prev => [...prev, ...newImages]);
                        setPreviewImages(prev => [...prev, ...newPreviewImages]);
                    }
                    setPending(false);
                }
            };
            reader.readAsDataURL(file);
        });

        // 유효한 파일이 없는 경우
        if (validFiles === 0) {
            setPending(false);
        }
    };    // 이미지 삭제 핸들러 - 새로 추가한 이미지를 삭제하는 경우
    const handleImageDelete = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setPreviewImages(prev => prev.filter((_, i) => i !== index));

        // 파일 input 초기화 (재업로드 가능하게)
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // 이미지 URL 삭제 핸들러 - 기존 이미지 URL을 삭제하는 경우
    const handleImageUrlDelete = (index: number) => {
        setImageUrls(prev => prev.filter((_, i) => i !== index));
    };

    // 폼 유효성 검사
    const isFormValid = () => {
        if (!content.trim() || content.length < 10) return false;

        if (type === 'question' || type === 'edit-question') {
            return title.trim() !== '' && category !== '';
        }

        return true;
    };

    // 폼 유효성 검사 함수
    const validateForm = () => {
        // 기본 유효성 검사
        if (!content.trim()) {
            showToast.error("내용을 입력해주세요.");
            return false;
        }

        if (content.length < 10) {
            showToast.error("내용은 최소 10자 이상 입력해주세요.");
            return false;
        }

        // 질문 작성 시 제목과 카테고리 필수
        if ((type === 'question' || type === 'edit-question') && !title.trim()) {
            showToast.error("제목을 입력해주세요.");
            return false;
        }

        if ((type === 'question' || type === 'edit-question') && !category) {
            showToast.error("카테고리를 선택해주세요.");
            return false;
        }

        return true;
    };

    // 폼 제출 핸들러
    const handleSubmit = () => {
        if (!validateForm()) return;
        setPending(true);

        switch (type) {
            case 'answer':
                handleCreateAnswer();
                break;
            case 'question':
                handleCreateQuestion();
                break;
            case 'edit-question':
                handleUpdateQuestion();
                break;
            case 'edit-answer':
                handleUpdateAnswer();
                break;
        }
    };

    // 이미지를 FormData에 추가하는 유틸리티 함수
    const appendImagesToFormData = (formData: FormData) => {
        images.forEach((image) => {
            formData.append('images', image);
        });

        return formData
    };

    // 질문 데이터 생성 함수 (JSON)
    const createQuestionData = () => {
        return {
            title,
            content,
            categoryType: category,
            tags,
            isPrivate: isPrivateQuestion
        };
    };

    // 답변 데이터 생성 함수 (JSON)
    const createAnswerData = () => {
        return {
            content,
            isAdapted: false
        };
    };

    // 답변 수정 데이터 생성 함수 (JSON)
    const createAnswerUpdateData = () => {
        return {
            content
        };
    };

    // 에디터 상태 초기화 함수
    const resetEditor = () => {
        setContent("");
        setImages([]);
        setPreviewImages([]);
        if (fileInputRef.current) fileInputRef.current.value = '';
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


    // 답변 등록 함수
    const handleCreateAnswer = () => {
        if (!qnaId) return;

        // 이미지가 있는 경우 FormData로 처리
        if (images.length > 0) {
            const formData = new FormData();

            // 답변 데이터 준비
            const answerData = {
                content,
                isAdapted: false
            };

            // 'answer' 파트 추가
            const answerBlob = new Blob([JSON.stringify(answerData)], { type: 'application/json' });
            formData.append('answer', answerBlob);

            // 이미지 추가
            appendImagesToFormData(formData);

            createAnswerMutation.mutate({
                qnaId: Number(qnaId),
                formData
            }, {
                onSuccess: handleAnswerSuccess,
                onError: handleError
            });
        } else {
            // 이미지가 없는 경우 JSON으로 처리
            const answerData = createAnswerData();

            createAnswerMutation.mutate({
                qnaId: Number(qnaId),
                formData: answerData as any // 타입 호환을 위한 임시 처리
            }, {
                onSuccess: handleAnswerSuccess,
                onError: handleError
            });
        }
    };

    // 질문 등록 함수
    const handleCreateQuestion = () => {
        // 이미지가 있는 경우 FormData로 처리
        if (images.length > 0) {
            const formData = new FormData();

            // 질문 데이터 준비
            const qnaData = {
                title,
                content,
                categoryType: category,
                tags,
                isPrivate: isPrivateQuestion
            };

            // 'qna' 파트 추가
            const qnaBlob = new Blob([JSON.stringify(qnaData)], { type: 'application/json' });
            formData.append('qna', qnaBlob);

            // 이미지 추가
            appendImagesToFormData(formData);

            createQnaMutation.mutate(formData, {
                onSuccess: () => handleQuestionSuccess(),
                onError: handleError
            });
        } else {
            // 이미지가 없는 경우 JSON으로 처리
            const qnaData = createQuestionData();

            createQnaMutation.mutate(qnaData as any, { // 타입 호환을 위한 임시 처리
                onSuccess: () => handleQuestionSuccess(),
                onError: handleError
            });
        }
    };

    // 질문 수정 함수
    const handleUpdateQuestion = () => {
        if (!qnaId) return;

        // 이미지가 있거나 이미지 URL이 있는 경우 FormData로 처리
        if (images.length > 0 || imageUrls.length > 0) {
            const formData = new FormData();

            // 이미지 추가
            const updatedFormData = appendImagesToFormData(formData);

            // 기존 이미지 URL 추가
            if (imageUrls.length > 0) {
                const imageUrlsBlob = new Blob([JSON.stringify(imageUrls)], { type: 'application/json' });
                updatedFormData.append('imageUrls', imageUrlsBlob);
            }

            // 이미지 업로드
            uploadQnaImagesMutation.mutate(
                updatedFormData
                , {
                    onSuccess: () => handleQuestionSuccess(qnaId),
                    onError: handleError
                });
        }
        // 데이터 업로드
        const qnaData = createQuestionData();

        updateQnaMutation.mutate({
            qnaId,
            qnaData
        }, {
            onSuccess: () => handleQuestionSuccess(qnaId),
            onError: handleError
        });
    };

    // 답변 수정 함수
    const handleUpdateAnswer = () => {
        if (!answerId || !qnaId) return;

        // 이미지가 있거나 이미지 URL이 있는 경우 FormData로 처리
        if (images.length > 0 || imageUrls.length > 0) {
            const formData = new FormData();

            // 이미지 추가
            appendImagesToFormData(formData);

            // 기존 이미지 URL 추가
            if (imageUrls.length > 0) {
                const imageUrlsBlob = new Blob([JSON.stringify(imageUrls)], { type: 'application/json' });
                formData.append('imageUrls', imageUrlsBlob);
            }

            // 이미지 파일 추가
            appendImagesToFormData(formData);

            uploadAnswerImagesMutation.mutate({
                answerId: Number(answerId),
                formData
            }, {
                onSuccess: () => handleAnswerSuccess(),
                onError: handleError
            });
        }

        // 이미지가 없는 경우 JSON으로 처리
        const answerData = createAnswerUpdateData();

        updateAnswerMutation.mutate({
            answerId,
            answerData
        }, {
            onSuccess: () => handleAnswerSuccess(),
            onError: handleError
        })
    };

    // 모든 상태 및 핸들러 반환    
    return {
        title,
        setTitle,
        content,
        setContent,
        category,
        setCategory,
        tags,
        setTags,
        isPrivateQuestion,
        setIsPrivateQuestion,
        images,
        setImages,
        imageUrls,
        setImageUrls,
        previewImages,
        isPending,
        fileInputRef,
        handleContentChange,
        handleImageUpload,
        handleImageDelete,
        handleImageUrlDelete,
        handleSubmit,
        isFormValid
    };
}
