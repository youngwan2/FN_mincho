import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from 'react';
import QnaEditor from "@/components/editor/QnaEditor";
import { useQnaDetailGetQuery } from "../../hooks/queries/useQueryQna";
import useScrollTo from '@/hooks/useScrollTo';
import { MdQuestionAnswer } from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";

export default function QnaEditPage() {
    const { qnaId } = useParams<{ qnaId: string }>();
    const navigate = useNavigate();
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useScrollTo();

    // QnA 상세 정보 조회
    const { qna, isLoading, isError } = useQnaDetailGetQuery(Number(qnaId));

    useEffect(() => {
        if (qna && !isLoading) {
            setIsDataLoaded(true);
        }
    }, [qna, isLoading]);

    // 제출 성공 핸들러
    const handleSubmitSuccess = () => {
        navigate(`/community/qnas/${qnaId}`);
    };

    // 취소 핸들러
    const handleCancel = () => {
        navigate(`/community/qnas/${qnaId}`);
    };

    // 로딩 중 표시
    if (isLoading || !isDataLoaded) {
        return (
            <section className="min-h-screen p-6">
                <div className="max-w-[1200px] w-full mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/6 mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/4 mb-8"></div>
                        <div className="h-32 bg-gray-200 rounded mb-8"></div>
                    </div>
                </div>
            </section>
        );
    }

    // 에러 표시
    if (isError || !qna) {
        return (
            <section className="min-h-screen p-6">
                <div className="max-w-[1200px] w-full mx-auto">
                    <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                        <h2 className="text-red-600 text-xl font-bold mb-2">오류가 발생했습니다</h2>
                        <p>데이터를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요.</p>
                        <button
                            onClick={() => navigate('/community/qnas')}
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                            목록으로 돌아가기
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen p-6">
            <div className="max-w-[1200px] w-full mx-auto">

                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div className="text-center md:text-left">
                        <div className="inline-flex items-center bg-[#0ac17b] px-4 py-1.5 rounded-full mb-4 shadow-[inset_-2px_-2px_5px_rgba(0,0,0,0.05)] animate-fade-right">
                            <MdQuestionAnswer className="text-white mr-2" />
                            <span className="bg-[#0ac17b] text-white font-medium">질문 수정</span>
                        </div>
                        <h1 className="flex items-center text-5xl md:text-6xl md:justify-start justify-center gap-3 font-bold text-gray-800 mb-5 md:mb-6 animate-fade-left">
                            <FaRegQuestionCircle className="text-primary-green hidden md:block" size={48} />
                            <span>질문 수정하기</span>
                        </h1>
                        <div className="animate-fade-down">
                            <strong className="text-[#05D182] text-3xl block mb-2">질문을 수정해보세요</strong>
                            <p className="text-gray-600 text-2xl md:max-w-xl">더 정확한 질문으로 더 좋은 답변을 받을 수 있어요</p>
                        </div>
                    </div>

                    <button
                        onClick={handleCancel}
                        className="bg-gradient-to-r from-gray-500 to-gray-700 text-white px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 cursor-pointer font-medium animate-fade-up"
                    >
                        <FiArrowLeft className="text-white" size={20} />
                        돌아가기
                    </button>
                </div>

                {/* 에디터 컴포넌트 */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <QnaEditor
                        qnaId={Number(qnaId)}
                        initTitle={qna.title}
                        initCategoryType={String(qna.categoryId || "")}
                        initContents={qna.content}
                        initImageUrls={qna.imageUrls || []}
                        initTags={qna.tags || []}
                        type="edit-question"
                        isPrivate={qna.isPrivate}
                        onSubmitSuccess={handleSubmitSuccess}
                        onClose={handleCancel}
                    />
                </div>
            </div>
        </section>
    );
}