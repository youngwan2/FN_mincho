import { useState, useRef } from 'react';
import { UseQnaEditorProps, QnaEditorState } from './types';
import { useEffect } from 'react';

export function useQnaEditorState({
    initTitle = '',
    initCategoryType = '',
    initContents = '',
    initImageUrls = [],
    isPrivate = false,
}: UseQnaEditorProps): QnaEditorState {
    // 상태 관리
    const [title, setTitle] = useState(initTitle);
    const [content, setContent] = useState(initContents);
    const [category, setCategory] = useState(initCategoryType);
    const [tags, setTags] = useState<string[]>([]);
    const [isPrivateQuestion, setIsPrivateQuestion] = useState(isPrivate);
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>(initImageUrls); // 기존 이미지 URL 저장
    const [deletedImageUrls, setDeletedImageUrls] = useState<string[]>([]); // 삭제된 이미지 URL 저장
    const [isPending, setPending] = useState(false);

    // 상태 값이 변경될 때마다 콘솔에 로깅
    useEffect(() => {
        console.log({
            title,
            content,
            category,
            tags,
            isPrivateQuestion,
            images,
            previewImages,
            imageUrls,
            deletedImageUrls,
            isPending
        });
    }, [
        title,
        content,
        category,
        tags,
        isPrivateQuestion,
        images,
        previewImages,
        imageUrls,
        deletedImageUrls,
        isPending
    ]);



    const fileInputRef = useRef<HTMLInputElement>(null);

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
        previewImages,
        setPreviewImages,
        imageUrls,
        setImageUrls,
        deletedImageUrls,
        setDeletedImageUrls,
        isPending,
        setPending,
        fileInputRef
    };
}
