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

export interface UseQnaEditorProps {
    qnaId?: number;
    answerId?: number;  // 답변 ID 추가
    initTitle?: string;
    initCategoryType?: string;
    initContents?: string;
    initImageUrls?: string[]; // 초기 이미지 URL 목록 추가
    initTags?: string[];
    type?: EditorType;
    isPrivate?: boolean;
    onSubmitSuccess?: () => void;
}

export interface QnaEditorState {
    title: string;
    setTitle: (title: string | ((prev: string) => string)) => void;
    content: string;
    setContent: (content: string | ((prev: string) => string)) => void;
    category: string;
    setCategory: (category: string | ((prev: string) => string)) => void;
    tags: string[];
    setTags: (tags: string[] | ((prev: string[]) => string[])) => void;
    isPrivateQuestion: boolean;
    setIsPrivateQuestion: (isPrivate: boolean | ((prev: boolean) => boolean)) => void;
    images: File[];
    setImages: (images: File[] | ((prev: File[]) => File[])) => void;
    previewImages: string[];
    setPreviewImages: (images: string[] | ((prev: string[]) => string[])) => void;
    imageUrls: string[];
    setImageUrls: (urls: string[] | ((prev: string[]) => string[])) => void;
    deletedImageUrls: string[];
    setDeletedImageUrls: (urls: string[] | ((prev: string[]) => string[])) => void;
    isPending: boolean;
    setPending: (isPending: boolean | ((prev: boolean) => boolean)) => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export interface FormDataContent {
    title?: string;
    content: string;
    category?: string;
    tags?: string[];
    isPrivate?: boolean;
    isAdapted?: boolean;
}
