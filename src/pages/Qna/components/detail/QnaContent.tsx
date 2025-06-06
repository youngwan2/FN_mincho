import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import DOMPurify from 'dompurify';

interface QnaContentProps {
    content: string;
    imageUrls?: string[];
}

export default function QnaContent({ content, imageUrls = [] }: QnaContentProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // 이미지가 있을 경우 이미지 크기 조정을 위한 useEffect
    useEffect(() => {
        if (contentRef.current) {
            // 컨텐츠 내부의 이미지 요소들을 찾아서 스타일 적용
            const images = contentRef.current.querySelectorAll('img');
            images.forEach(img => {
                // 이미지에 tiptap-extension-resize-image와 비슷한 스타일 적용
                img.classList.add('rounded-sm');
                img.style.maxWidth = '100%';
                img.style.height = 'auto';

                // 이미지 클릭 시 모달 열기
                img.style.cursor = 'pointer';
                img.addEventListener('click', () => {
                    // 컨텐츠 내 이미지 클릭 시 첫 번째 이미지부터 시작
                    openModal(0);
                });
            });
        }
    }, [content]);

    // 모달 관련 함수들
    const openModal = (index: number) => {
        setCurrentImageIndex(index);
        setIsModalOpen(true);
        // 모달이 열렸을 때 스크롤 방지
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        // 모달이 닫혔을 때 스크롤 복원
        document.body.style.overflow = 'auto';
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % (imageUrls?.length || 1));
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + (imageUrls?.length || 1)) % (imageUrls?.length || 1));
    };

    // 전역 키보드 이벤트 리스너
    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if (!isModalOpen) return;

            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'Escape') closeModal();
        };

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [isModalOpen, currentImageIndex, imageUrls?.length]);

    // 이미지 모달 컴포넌트
    const ImageModal = () => {
        return (
            <div
                className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-[9999] flex items-center justify-center"
                onClick={closeModal}
                tabIndex={0}
            >
                <div
                    className="relative w-full h-full flex flex-col justify-center items-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* 상단 닫기 버튼 (모바일에서도 보임) */}
                    <button
                        className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10 p-2"
                        onClick={closeModal}
                        aria-label="닫기"
                    >
                        &times;
                    </button>

                    {/* 모바일용 전체화면 닫기 버튼 */}
                    <button
                        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-70 text-black px-6 py-3 rounded-full font-bold text-lg shadow-lg z-10 md:hidden"
                        onClick={closeModal}
                    >
                        닫기
                    </button>

                    {/* 이미지 */}
                    <div className="relative max-w-[90%] max-h-[80%] flex justify-center">
                        <img
                            src={imageUrls[currentImageIndex]}
                            alt={`이미지 ${currentImageIndex + 1}`}
                            className="max-h-full max-w-full object-contain"
                        />
                    </div>

                    {/* 이미지 카운터 */}
                    <div className="text-white mt-4">
                        {currentImageIndex + 1} / {imageUrls.length}
                    </div>

                    {/* 이전 버튼 */}
                    <button
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-5xl hover:text-gray-300 focus:outline-none"
                        onClick={(e) => {
                            e.stopPropagation();
                            prevImage();
                        }}
                    >
                        &#10094;
                    </button>

                    {/* 다음 버튼 */}
                    <button
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-5xl hover:text-gray-300 focus:outline-none"
                        onClick={(e) => {
                            e.stopPropagation();
                            nextImage();
                        }}
                    >
                        &#10095;
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="qna-content-wrapper">
            {/* 컨텐츠 표시 영역 */}
            <div ref={contentRef} className="prose max-w-none mb-6 mt-6">
                <div className="tiptap-content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
            </div>

            {/* 첨부된 이미지가 있는 경우 별도 표시 */}
            {imageUrls && imageUrls.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-2xl font-medium mb-2">첨부 이미지</h3>
                    <div className="flex flex-wrap gap-5">
                        {imageUrls.map((url, i) => (
                            <div
                                key={i}
                                className="animate-fade relative w-64 h-64 shadow-[0_0_0_1px_rgba(0,0,0,0.2)] transition-shadow overflow-hidden rounded-sm cursor-pointer"
                                onClick={() => openModal(i)}
                            >
                                <img
                                    src={url}
                                    alt={`첨부 이미지 ${i + 1}`}
                                    className="w-62 h-62 object-cover rounded"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 이미지 슬라이드쇼 모달 (포털 사용) */}
            {isModalOpen && imageUrls.length > 0 && createPortal(<ImageModal />, document.body)}
        </div>
    );
}
