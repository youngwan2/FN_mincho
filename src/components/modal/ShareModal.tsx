import Portal from "@/components/Portal";
import { useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import {
    FaFacebookSquare,
    FaLink,
} from "react-icons/fa"; // Twitter → X 로 아이콘도 변경
import { MdClose } from "react-icons/md";

interface ShareModalProps {
    title: string;
    url?: string;
}

export default function ShareModal({ title, url }: ShareModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title);

    const handleWebShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title, url: shareUrl });
            } catch (err) {
                console.error("Web Share 실패:", err);
            }
        } else {
            await handleCopyLink();
        }
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            alert("링크가 복사되었습니다!");
        } catch (err) {
            console.error("복사 실패:", err);
        }
    };

    return (
        <>
            <button
                title="공유하기"
                onClick={() => setIsOpen(true)}
                className="cursor-pointer flex items-center gap-2 px-4 py-2 text-gray-700 rounded hover:bg-gray-200 transition"
            >
                <FaShareAlt />
            </button>

            {isOpen && (
                <Portal>
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000000000000]">
                        <div className="bg-white w-full max-w-md rounded-2xl p-8 relative shadow-xl animate-fade-up">
                            <button
                                title="닫기"
                                className="cursor-pointer absolute top-3 right-3 text-gray-500 hover:text-black"
                                onClick={() => setIsOpen(false)}
                            >
                                <MdClose size={24} />
                            </button>

                            <h2 className="text-3xl font-semibold text-center mb-5 mt-10">마음에 드는 민초 게시글을 SNS에 공유해보세요!</h2>

                            <div className="flex flex-col gap-3 mt-10">
                                {/* Web Share */}
                                <button
                                    onClick={handleWebShare}
                                    className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
                                >
                                    <FaShareAlt className="text-gray-600" />
                                    시스템 공유 (모바일 등)
                                </button>

                                {/* Facebook */}
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 text-gary-700"
                                >
                                    <FaFacebookSquare />
                                    Facebook으로 공유
                                </a>

                                {/* X (ex. Twitter) */}
                                <a
                                    href={`https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-4 py-2 border  border-gray-300 rounded hover:bg-gray-100 text-black"
                                >
                                    X 공유
                                </a>

                                {/* 링크 복사 */}
                                <button
                                    onClick={handleCopyLink}
                                    className="flex items-center justify-center gap-2 px-4 py-2 border  border-gray-300 rounded hover:bg-gray-100"
                                >
                                    <FaLink className="text-gray-600" />
                                    링크 복사
                                </button>
                            </div>
                        </div>
                    </div>
                </Portal>
            )}
        </>
    );
}
