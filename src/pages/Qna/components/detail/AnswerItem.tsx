import { useState } from 'react';
import { AnswerDetail } from '@/types/qna.types';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { FiEdit } from 'react-icons/fi';
import noProfileImage from '@/assets/noImage.png';
import { useDeleteAnswerMutation } from '@/hooks/mutations/useMutationAnswer';
import ReactionButtons from './ReactionButtons';
import QnaEditor from '@/components/editor/QnaEditor';
import QnaContent from './QnaContent';
import { Link } from 'react-router';

interface AnswerItemProps {
    answer: AnswerDetail;
    onAdoptAnswer?: (answerId: number) => void;
    isQuestionMine: boolean;
    isAnswerAdopted: boolean;
    qnaId: string;  // QnaID 추가 (답변 수정에 필요)
}


export default function AnswerItem({
    answer,
    onAdoptAnswer,
    isQuestionMine,
    isAnswerAdopted,
    qnaId
}: AnswerItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const deleteAnswerMutation = useDeleteAnswerMutation(Number(qnaId));

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        try {
            return format(parseISO(dateString), 'yyyy.MM.dd HH:mm', { locale: ko });
        } catch (error) {
            return dateString;
        }
    };

    // 답변 삭제 처리
    const handleDelete = () => {
        if (confirm('정말 이 답변을 삭제하시겠습니까?')) {
            deleteAnswerMutation.mutate(answer.id);
        }
    };

    // 답변 수정 완료 처리
    const handleEditSuccess = () => {
        setIsEditing(false);
    };

    return (
        <div className={`flex gap-4 p-6 rounded-lg border mb-4 ${answer.isAdopted ? 'border-green-600 bg-green-50 border-2' : 'bg-white'}`}>

            {/* 좋아요/싫어요  */}
            <ReactionButtons answerId={answer.id} isMine={answer.isMine} />

            {/* 유저 답변 정보 */}
            <div className='w-full'>
                {/* 답변 채택 마크 */}
                {answer.isAdopted && (
                    <div className="flex items-center mb-3">
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xl font-semibold">
                            채택된 답변
                        </span>
                    </div>
                )}

                <div className="flex justify-between mb-3">
                    {/* 작성자 정보 */}
                    <Link to={`/users/${answer.writerId}`} className="flex items-center">
                        <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden mr-3">
                            {/* 프로필 이미지가 있다면 여기에 표시 */}
                            <img
                                src={answer.avatarUrl || noProfileImage} alt='답변자 프로필 이미지' onError={(e) => e.currentTarget.src = noProfileImage} />
                        </div>
                        <div>
                            <p className="font-medium">{answer.writer || '익명'}</p>
                            <p className="text-xl text-gray-500">{formatDate(answer.createdAt)}</p>
                        </div>
                    </Link>

                    <div className="flex items-center gap-2">                        {/* 본인 답변일 경우 수정/삭제 버튼 */}
                        {answer.isMine && !isEditing && (
                            <>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
                                    title="수정하기"
                                >
                                    <FiEdit size={16} /> 수정
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
                                    title="삭제하기"
                                >
                                    삭제
                                </button>
                            </>
                        )}

                        {/* 채택 버튼 (질문 작성자이고, 아직 채택되지 않은 경우만 표시) */}
                        {isQuestionMine && !isAnswerAdopted && !answer.isAdopted && onAdoptAnswer && (
                            <button
                                onClick={() => onAdoptAnswer(answer.id)}
                                className="px-4 py-2 bg-gradient-to-r from-[#05D182] to-[#03A77F] text-white rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1"
                            >
                                답변 채택하기
                            </button>
                        )}
                    </div>
                </div>

                {/* 답변 내용 - 수정 모드가 아닐 때만 표시 */}
                {!isEditing ? (
                    <>
                        {/* QnaContent로 콘텐츠와 이미지 표시 */}
                        <QnaContent content={answer.content} imageUrls={answer.images || []} />
                    </>
                ) : (

                    /* 답변 수정 폼 */
                    <div className="mt-4">
                        <div className="bg-gray-50 p-3 mb-4 rounded-md">
                            <p className="text-2xl text-gray-800 font-semibold flex items-center gap-2"><FiEdit /> 답변 수정하기</p>
                        </div>
                        <QnaEditor
                            qnaId={Number(qnaId)}
                            answerId={answer.id}
                            type="edit-answer"
                            initContents={answer.content}
                            initImageUrls={answer.images || []} // 기존 이미지 URL 목록 전달
                            onSubmitSuccess={handleEditSuccess}
                            onClose={() => setIsEditing(false)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
