import React from 'react';
import { AnswerDetail } from '@/types/qna.types';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import ReactionButtons from './ReactionButtons';

interface AnswerItemProps {
    answer: AnswerDetail;
    onAdoptAnswer?: (answerId: number) => void;
    isQuestionMine: boolean;
    isAnswerAdopted: boolean;
}

const AnswerItem: React.FC<AnswerItemProps> = ({
    answer,
    onAdoptAnswer,
    isQuestionMine,
    isAnswerAdopted
}) => {
    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        try {
            return format(parseISO(dateString), 'yyyy.MM.dd HH:mm', { locale: ko });
        } catch (error) {
            return dateString;
        }
    };

    return (
        <div className={`p-6 rounded-lg border mb-4 ${answer.isAdopted ? 'border-green-500 bg-green-50' : 'bg-white'}`}>
            {/* 답변 채택 마크 */}
            {answer.isAdopted && (
                <div className="flex items-center mb-3">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        채택된 답변
                    </span>
                </div>
            )}

            <div className="flex justify-between mb-3">
                {/* 작성자 정보 */}
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden mr-3">
                        {/* 프로필 이미지가 있다면 여기에 표시 */}
                    </div>
                    <div>
                        <p className="font-medium">{answer.writer}</p>
                        <p className="text-sm text-gray-500">{formatDate(answer.createdAt)}</p>
                    </div>
                </div>

                {/* 채택 버튼 (질문 작성자이고, 아직 채택되지 않은 경우만 표시) */}
                {isQuestionMine && !isAnswerAdopted && !answer.isAdopted && onAdoptAnswer && (
                    <button
                        onClick={() => onAdoptAnswer(answer.id)}
                        className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm"
                    >
                        답변 채택하기
                    </button>
                )}
            </div>

            {/* 답변 내용 */}
            <div className="prose max-w-none mb-4">
                <div dangerouslySetInnerHTML={{ __html: answer.content }} />
            </div>

            {/* 이미지 첨부 */}
            {answer.images && answer.images.length > 0 && (
                <div className="flex flex-wrap gap-2 my-4">
                    {answer.images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`첨부 이미지 ${index + 1}`}
                            className="w-24 h-24 object-cover rounded-md"
                        />
                    ))}
                </div>
            )}

            {/* 반응 버튼 (좋아요/싫어요) */}
            <ReactionButtons
                answerId={answer.id}
                userReacted={answer.userReaction as any}
            />
        </div>
    );
};

export default AnswerItem;
