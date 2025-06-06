import { showToast } from '../../components/toast/CustomToast';
import { QnaEditorState } from './types';

export function useQnaEditorImages(state: QnaEditorState) {
    const {
        images,
        setImages,
        setPreviewImages,
        imageUrls,
        setImageUrls,
        deletedImageUrls,
        setDeletedImageUrls,
        setPending,
        fileInputRef
    } = state;

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
    };

    // 이미지 삭제 핸들러 - 새로 추가한 이미지를 삭제하는 경우
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
        // 삭제할 이미지 URL을 deletedImageUrls에 추가
        const deletedUrl = imageUrls[index];
        setDeletedImageUrls(prev => [...prev, deletedUrl]);

        // 현재 이미지 URL 목록에서 제거
        setImageUrls(prev => prev.filter((_, i) => i !== index));
    };

    // 이미지를 FormData에 추가하는 유틸리티 함수
    const appendImagesToFormData = (formData: FormData) => {
        images.forEach((image) => {
            formData.append('images', image);
        });

        return formData;
    };

    // FormData에 이미지 URL과 삭제된 이미지 URL 추가
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

    return {
        handleImageUpload,
        handleImageDelete,
        handleImageUrlDelete,
        appendImagesToFormData,
        appendImageUrlsToFormData
    };
}
