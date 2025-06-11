import { useState, useRef } from "react";
import { MdClose, MdFileDownload, MdPictureAsPdf } from "react-icons/md";
import { HerbDetail } from "../../../../types/herb.types";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import "./modal.css";
import DOMPurify from "dompurify";
import noImage from '@/assets/noImage.png'
import Portal from "./Portal";

interface PdfPreviewModalProps {
    herb: HerbDetail;
}

export default function PdfPreviewModal({ herb }: PdfPreviewModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // HTML 태그 제거 및 개행 처리를 위한 함수
    const sanitizeAndFormatText = (text?: string) => {
        if (!text) return "";
        let preprocessed = text
            .replace(/<br\s*\/?\>/gi, '###BR###')
            .replace(/- /g, '###DASH### ');
        const sanitized = DOMPurify.sanitize(preprocessed, { ALLOWED_TAGS: [] });
        const formatted = sanitized
            .replace(/###BR###/g, '\n')
            .replace(/###DASH###/g, '- ')
            .replace(/&nbsp;/gi, ' ')
            .replace(/□/g, '■')
            .replace(/\n\s*\n/g, '\n\n')
            .trim();
        return formatted;
    };

    const getHtml2CanvasOptions = () => ({
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: true,
        backgroundColor: "#fffcf5",
        imageTimeout: 15000,
        removeContainer: true,
        onclone: (document: Document) => {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                img.crossOrigin = 'anonymous';
                img.onerror = () => {
                    img.src = noImage;
                    img.style.maxHeight = '300px';
                };
            });
            return document;
        },
        ignoreElements: (element: Element) => {
            return element.classList.contains('ignore-pdf');
        }
    });

    const waitForImagesLoaded = async () => {
        if (!contentRef.current) return;
        const images = contentRef.current.querySelectorAll('img');
        const imagePromises = Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise<void>((resolve) => {
                img.onload = () => resolve();
                img.onerror = () => {
                    console.log('이미지 로드 실패, 기본 이미지로 대체');
                    img.src = noImage;
                    resolve();
                };
            });
        });
        await Promise.all(imagePromises);
        console.log('모든 이미지 로딩 완료');
    };

    const createPdfDocument = async () => {
        if (!contentRef.current) throw new Error("콘텐츠 참조가 없습니다");
        try {
            await waitForImagesLoaded();
            console.log('HTML 캔버스 변환 시작');
            const canvas = await html2canvas(contentRef.current, getHtml2CanvasOptions());
            console.log('HTML 캔버스 변환 완료');
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: "p",
                unit: "mm",
                format: "a4"
            });
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
            return { pdf, canvas };
        } catch (error) {
            console.error('PDF 문서 생성 중 오류 발생:', error);
            throw error;
        }
    };

    const generatePDF = async () => {
        setIsLoading(true);
        try {
            console.log('PDF 생성 시작: 이미지 및 콘텐츠 준비 확인');
            const imgElements = contentRef.current?.querySelectorAll('img');
            if (imgElements) {
                imgElements.forEach(img => {
                    if (!img.src || img.src === 'about:blank' || img.naturalWidth === 0) {
                        console.log('유효하지 않은 이미지 감지: 기본 이미지로 대체');
                        img.src = herb.imgUrls[0] || noImage;
                    }
                });
            }
            const { pdf } = await createPdfDocument();
            const pdfBlob = pdf.output("blob");
            const url = URL.createObjectURL(pdfBlob);
            setPreviewUrl(url);
            console.log('PDF 생성 완료: 미리보기 URL 생성됨');
        } catch (error) {
            console.error("PDF 생성 중 오류 발생:", error);
            alert("PDF 생성 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    const downloadPDF = async () => {
        setIsLoading(true);
        try {
            const { pdf } = await createPdfDocument();
            pdf.save(`${herb?.cntntsSj || "herb-detail"}.pdf`);
        } catch (error) {
            console.error("PDF 다운로드 중 오류 발생:", error);
            alert("PDF 다운로드 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = async () => {
        setIsOpen(true);
        setTimeout(() => {
            if (herb.imgUrls && herb.imgUrls.length > 0) {
                const preloadImg = new Image();
                preloadImg.crossOrigin = 'anonymous';
                preloadImg.onload = () => {
                    console.log('이미지 사전 로드 완료');
                    setTimeout(() => {
                        generatePDF();
                    }, 300);
                };
                preloadImg.onerror = () => {
                    console.log('이미지 사전 로드 실패');
                    setTimeout(() => {
                        generatePDF();
                    }, 300);
                };
                preloadImg.src = herb.imgUrls[0];
            } else {
                generatePDF();
            }
        }, 800);
        document.addEventListener('keydown', handleKeyDown);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
        document.removeEventListener('keydown', handleKeyDown);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            handleCloseModal();
        }
    };

    return (
        <>
            <button
                title="PDF 다운로드"
                onClick={handleOpenModal}
                className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
            >
                <MdPictureAsPdf />
                <span>PDF 다운로드</span>
            </button>

            {isOpen && (
                <Portal>
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(0,0,0,0.7)] p-4">
                        <div className="bg-white rounded-lg w-full h-[90vh] flex flex-col">
                            <div className="flex justify-between items-center p-4 border-b">
                                <h3 className="text-xl font-bold">약초 PDF 미리보기</h3>
                                <button
                                    onClick={handleCloseModal}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <MdClose size={24} />
                                </button>
                            </div>
                            <div className="flex-1 overflow-auto">
                                {isLoading ? (
                                    <div className="h-full flex items-center justify-center">
                                        <div className="text-xl">PDF를 생성하는 중...</div>
                                    </div>
                                ) : previewUrl ? (
                                    <iframe
                                        src={previewUrl}
                                        title="PDF Preview"
                                        className="w-full h-full"
                                    />
                                ) : (
                                    <div className="h-full flex items-center justify-center">
                                        <div className="text-xl">미리보기를 생성하는 중...</div>
                                    </div>
                                )}
                            </div>
                            <div className="p-4 border-t flex justify-between">
                                <button
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                                >
                                    닫기
                                </button>
                                <button
                                    onClick={downloadPDF}
                                    disabled={isLoading}
                                    className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <MdFileDownload />
                                    <span>{isLoading ? '처리 중...' : 'PDF 다운로드'}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </Portal>
            )}
            <div className="fixed left-[-9999px]" ref={contentRef}>
                <div className="pdf-content" style={{ width: "1000px" }}>
                    <h1 className="pdf-title">{herb.cntntsSj}</h1>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-1/3">
                            <div className="pdf-image-container">
                                <img
                                    src={herb.imgUrls && herb.imgUrls.length > 0 ? herb.imgUrls[0] : noImage}
                                    alt={herb.cntntsSj}
                                    className="w-full object-contain max-h-[300px]"
                                    onError={(e) => {
                                        console.log("이미지 로딩 실패, 기본 이미지로 대체");
                                        e.currentTarget.src = noImage;
                                    }}
                                />
                                <p className="text-center text-xl mt-2 italic">{herb.cntntsSj} (약초 이미지)</p>
                            </div>
                            <div className="bg-[#f4f8eb] border border-[#e0d5c1] p-4 rounded-md shadow-sm">
                                <h3 className="text-[#265c00] text-lg font-semibold mb-3 border-b border-[#8aad41] pb-2 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="#3e6c15">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    기본 정보
                                </h3>
                                <div className="space-y-3 text-xl">
                                    <div className="flex">
                                        <span className="font-semibold text-[#3e6c15] w-20">학명:</span>
                                        <span className="italic">{herb.bneNm}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="font-semibold text-[#3e6c15] w-20">한방명:</span>
                                        <span>{herb.hbdcNm}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="font-semibold text-[#3e6c15] w-20">자료 ID:</span>
                                        <span className="text-gray-600">{herb.id}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-2/3">
                            <table className="pdf-data-table">
                                <tbody>
                                    {herb.flowering && (
                                        <tr>
                                            <th>개화기</th>
                                            <td className="pdf-text">{sanitizeAndFormatText(herb.flowering)}</td>
                                        </tr>
                                    )}
                                    {herb.growthForm && (
                                        <tr>
                                            <th>생장 형태</th>
                                            <td className="pdf-text">{sanitizeAndFormatText(herb.growthForm)}</td>
                                        </tr>
                                    )}
                                    {herb.habitat && (
                                        <tr>
                                            <th>분포 및 환경</th>
                                            <td className="pdf-text">{sanitizeAndFormatText(herb.habitat)}</td>
                                        </tr>
                                    )}
                                    {herb.useeRegn && (
                                        <tr>
                                            <th>사용 부위</th>
                                            <td className="pdf-text">{sanitizeAndFormatText(herb.useeRegn)}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            {herb.prvateTherpy && (
                                <div className="pdf-section">
                                    <h2 className="pdf-subtitle">민간요법</h2>
                                    <div className="pdf-text whitespace-pre-line">{sanitizeAndFormatText(herb.prvateTherpy)}</div>
                                </div>
                            )}
                            {herb.harvest && (
                                <div className="pdf-section">
                                    <h2 className="pdf-subtitle">수확 및 건조</h2>
                                    <div className="pdf-text whitespace-pre-line">{sanitizeAndFormatText(herb.harvest)}</div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="pdf-footer">
                        ⓒ {new Date().getFullYear()} 약초 정보 | 생성일: {new Date().toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
