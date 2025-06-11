import QnaEditor from '@/components/editor/QnaEditor';
import { useState } from 'react';
import { FiEdit } from 'react-icons/fi';

interface AnswerFormProps {
    qnaId: string;
    isQuestionMine: boolean; // 질문 작성자인지 여부
}

const AnswerForm: React.FC<AnswerFormProps> = ({ qnaId, isQuestionMine }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isEditorVisible, setIsEditorVisible] = useState(false);

    // 답변 제출 성공 시 호출될 콜백
    const handleSubmitSuccess = () => {
        setIsSubmitted(true);
        setIsEditorVisible(false); // 제출 후 에디터 닫기
        setTimeout(() => setIsSubmitted(false), 5000);  // 5초 후 메시지 숨김
    };

    const handleEditorClose = () => {
        setIsEditorVisible(false);
        setIsSubmitted(false); // 에디터 닫을 때 제출 상태 초기화
    }

    return (
        <div className="mt-12 bg-white pt-5">
            {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 p-4 rounded-md text-green-800 mb-4">
                    답변이 성공적으로 등록되었습니다.
                </div>
            ) : null}

            {/* 답변 작성 버튼 */}
            {!isEditorVisible &&
                (<button
                    onClick={() => setIsEditorVisible(true)}
                    disabled={isQuestionMine} // 질문 작성자만 버튼 활성화
                    className={`${isQuestionMine ? 'disabled:opacity-70 cursor-not-allowed' : 'opacity-100 cursor-pointer'} flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-[#05D182] to-[#03A77F] text-white rounded-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 mb-6`}
                >
                    <FiEdit size={20} />
                    <span className="font-medium">답변 작성하기</span>
                </button>
                )
            }

            {/* 답변 작성 폼 */}
            {
                isEditorVisible && (
                    <QnaEditor
                        qnaId={Number(qnaId)}
                        type="answer"
                        onClose={handleEditorClose}
                        onSubmitSuccess={handleSubmitSuccess}
                    />
                )
            }
        </div >
    );
};

export default AnswerForm;
