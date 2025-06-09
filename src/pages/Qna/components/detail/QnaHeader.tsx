import { FiArrowLeft, FiEdit, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router";
import { MdQuestionAnswer } from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa";

interface QnaHeaderProps {
    qnaId: string;
    isQuestionMine: boolean;
    onDelete: () => void;
}

export default function QnaHeader({ qnaId, isQuestionMine, onDelete }: QnaHeaderProps) {
    const navigate = useNavigate(); return (
        <>
            {/* 헤더 - 메인 페이지 디자인과 통일 */}
            <div className='flex flex-col md:flex-row justify-between items-center mb-12 gap-6'>
                <div className="text-center md:text-left">
                    <div className="inline-flex items-center bg-[#0ac17b] px-4 py-1.5 rounded-full mb-4 shadow-[inset_-2px_-2px_5px_rgba(0,0,0,0.05)] animate-fade-right">
                        <MdQuestionAnswer className="text-white mr-2" />
                        <span className="bg-[#0ac17b] text-white font-medium">커뮤니티 서비스</span>
                    </div>
                    <h1 className="flex items-center text-5xl md:text-6xl md:justify-start justify-center gap-3 font-bold text-gray-800 mb-5 md:mb-6 animate-fade-left">
                        <FaRegQuestionCircle className="text-primary-green hidden md:block" size={48} />
                        <span>민초 Q&A</span>
                    </h1>
                    <div className="animate-fade-down">
                        <strong className="text-[#05D182] text-3xl block mb-2">자연의 지혜를 나누는 약초 커뮤니티</strong>
                        <p className="text-gray-600 text-2xl md:max-w-xl">약초의 효능, 재배법, 활용법에 대한 궁금증을 해결해요</p>
                    </div>
                </div>

                <button
                    onClick={() => navigate('/community/qnas')}
                    className="bg-gradient-to-r from-[#05D182] to-[#03A77F] text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 cursor-pointer font-medium animate-fade-up"
                >
                    <FiArrowLeft className="text-white" size={18} />
                    목록으로
                </button>
            </div>

            {/* 수정/삭제 버튼 */}
            {isQuestionMine && (
                <div className="flex justify-end mb-6 md:pt-0 pt-7">
                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate(`/community/qnas/${qnaId}/edit`)}
                            className="flex items-center px-5 py-2 bg-primary-green text-white rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 cursor-pointer "
                        >
                            <FiEdit className="mr-2" size={16} /> 수정하기
                        </button>
                        <button
                            onClick={onDelete}
                            className="flex items-center px-5 py-2 text-green border hover:text-red-400 rounded-lg transform transition-all duration-300 hover:-translate-y-1 cursor-pointer shadow-sm hover:shadow-lg"
                        >
                            <FiTrash className="mr-2" size={16} /> 삭제하기
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
