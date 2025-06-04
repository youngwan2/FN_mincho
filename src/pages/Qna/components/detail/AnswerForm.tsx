import QnaEditor from '@/components/editor/QnaEditor';
import { useState } from 'react';
import { FiEdit } from 'react-icons/fi';

interface AnswerFormProps {
    qnaId: string;
}

const AnswerForm: React.FC<AnswerFormProps> = ({ qnaId }) => {
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
        <div className="mt-12 bg-white">
            <h3 className="text-2xl font-bold mb-4">답변 작성</h3>

            {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 p-4 rounded-md text-green-800 mb-4">
                    답변이 성공적으로 등록되었습니다.
                </div>
            ) : null}

            {/* 답변 작성 버튼 */}
            {!isEditorVisible && (
                <button
                    onClick={() => setIsEditorVisible(true)}
                    className="flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 mb-6"
                >
                    <FiEdit size={20} />
                    <span className="font-medium">답변 작성하기</span>
                </button>
            )}

            {/* 답변 작성 폼 */}
            {isEditorVisible && (
                <QnaEditor
                    qnaId={Number(qnaId)}
                    type="answer"
                    onClose={handleEditorClose}
                    onSubmitSuccess={handleSubmitSuccess}
                />
            )}
        </div>
    );
};

export default AnswerForm;
