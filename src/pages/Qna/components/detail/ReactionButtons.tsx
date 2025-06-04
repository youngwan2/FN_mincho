import React, { useState } from 'react';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { AnswerReactionType } from '@/types/answer-reaction.types';
import { useAnswerReactionCountQuery } from '@/hooks/queries/useQueryAnswerReaction';
import { useAddAnswerReactionMutation } from '@/hooks/mutations/useMutationAnswerReaction';

interface ReactionButtonsProps {
    answerId: number;
    userReacted?: AnswerReactionType | null;
    isMine: boolean;  // 본인이 작성한 답변인지 여부
}

const ReactionButtons: React.FC<ReactionButtonsProps> = ({ answerId, userReacted = null, isMine }) => {
    const [currentReaction, setCurrentReaction] = useState<AnswerReactionType | null>(userReacted);

    // 좋아요/싫어요 개수 조회
    const { count: likeCount, isLoading: isLikeLoading } = useAnswerReactionCountQuery(answerId, 'LIKE');
    const { count: dislikeCount, isLoading: isDislikeLoading } = useAnswerReactionCountQuery(answerId, 'DISLIKE');

    // 좋아요/싫어요 추가 뮤테이션
    const addReactionMutation = useAddAnswerReactionMutation();

    // 반응 토글 처리
    const handleReaction = (type: AnswerReactionType) => {
        // 본인이 작성한 답변인 경우 경고창 표시
        if (isMine) {
            alert('본인이 작성한 답변에는 좋아요/싫어요를 평가할 수 없습니다.');
            return;
        }

        // 같은 버튼을 다시 누르면 취소, 다른 버튼을 누르면 새로운 반응으로 변경
        const newReaction = currentReaction === type ? null : type;
        setCurrentReaction(newReaction);

        // 서버에 반응 요청
        addReactionMutation.mutate({
            answerId,
            requestDTO: { reactionType: type }
        });
    };

    return (
        <div className="flex items-center gap-4 mt-2 flex-col sticky top-0 h-40">
            <button
                className={`flex items-center gap-1 py-1 px-2 rounded-md ${currentReaction === 'LIKE'
                    ? 'bg-blue-100 text-blue-700'
                    : isMine ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                onClick={() => handleReaction('LIKE')}
                disabled={isLikeLoading || addReactionMutation.isPending || isMine}
                title={isMine ? '본인이 작성한 답변에는 평가할 수 없습니다' : '이 답변 추천하기'}
            >
                <FiThumbsUp size={16} />
                <span>{likeCount}</span>
            </button>

            <button
                className={`flex items-center gap-1 py-1 px-2 rounded-md ${currentReaction === 'DISLIKE'
                    ? 'bg-red-100 text-red-700'
                    : isMine ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                onClick={() => handleReaction('DISLIKE')}
                disabled={isDislikeLoading || addReactionMutation.isPending || isMine}
                title={isMine ? '본인이 작성한 답변에는 평가할 수 없습니다' : '이 답변 비추천하기'}
            >
                <FiThumbsDown size={16} />
                <span>{dislikeCount}</span>
            </button>
        </div>
    );
};

export default ReactionButtons;
