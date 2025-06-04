import { FiArrowLeft, FiEdit, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router";

interface QnaHeaderProps {
    qnaId: string;
    isQuestionMine: boolean;
    onDelete: () => void;
}

export default function QnaHeader({ qnaId, isQuestionMine, onDelete }: QnaHeaderProps) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center mb-6">
            <button
                onClick={() => navigate('/community/qnas')}
                className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer"
            >
                <FiArrowLeft className="mr-2" /> 목록으로
            </button>

            {isQuestionMine && (
                <div className="flex gap-2">
                    <button
                        onClick={() => navigate(`/community/qnas/${qnaId}/edit`)}
                        className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md"
                    >
                        <FiEdit className="mr-1" /> 수정
                    </button>
                    <button
                        onClick={onDelete}
                        className="flex items-center px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-md"
                    >
                        <FiTrash className="mr-1" /> 삭제
                    </button>
                </div>
            )}
        </div>
    );
}
