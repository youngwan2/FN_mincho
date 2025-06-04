import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiImage } from 'react-icons/fi';

interface QnaImageGalleryProps {
    images: string[];
    title?: string;  // 제목을 커스터마이즈할 수 있는 옵션
    className?: string; // 추가 CSS 클래스
}

export default function QnaImageGallery({
    images,
    title = "첨부 이미지",
    className = "mb-8"
}: QnaImageGalleryProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!images || images.length === 0) return null;

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
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };    // 전역 키보드 이벤트 리스너
    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if (!isModalOpen) return;

            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'Escape') closeModal();
        };

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [isModalOpen, currentImageIndex, images.length]);

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
                            src={images[currentImageIndex]}
                            alt={`이미지 ${currentImageIndex + 1}`}
                            className="max-h-full max-w-full object-contain"
                        />
                    </div>

                    {/* 이미지 카운터 */}
                    <div className="text-white mt-4">
                        {currentImageIndex + 1} / {images.length}
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
    }; return (
        <div className={className}>
            <h3 className="font-bold mb-3 flex items-center gap-1"><FiImage /> {title}({images.length})</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images.map((img: string, i: number) => (
                    <img
                        key={i}
                        src={img}
                        alt={`${title} ${i + 1}`}
                        className="rounded-lg max-h-[300px] w-auto object-cover cursor-pointer"
                        onClick={() => openModal(i)}
                    />
                ))}
            </div>

            {/* 이미지 슬라이드쇼 모달 (포털 사용) */}
            {isModalOpen && createPortal(<ImageModal />, document.body)}
        </div>
    );
}
