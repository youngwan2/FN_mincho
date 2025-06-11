import React, { useState } from 'react';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { AnswerReactionType } from '@/types/answer-reaction.types';
import { useAnswerReactionCountQuery } from '@/hooks/queries/useQueryAnswerReaction';
import { useAddAnswerReactionMutation } from '@/hooks/mutations/useMutationAnswerReaction';
import useAuth from '@/hooks/useAuth';
import { showToast } from '@/components/toast/CustomToast';

interface ReactionButtonsProps {
    qnaId: number;  // QnA ID
    answerId: number;
    userReacted?: AnswerReactionType | null;
    isMine: boolean;  // 본인이 작성한 답변인지 여부
}

const ReactionButtons: React.FC<ReactionButtonsProps> = ({ qnaId, answerId, userReacted = null, isMine }) => {
    const [currentReaction, setCurrentReaction] = useState<AnswerReactionType | null>(userReacted);
    const isLogin = useAuth(); // 로그인 상태 확인

    // 좋아요/싫어요 개수 조회
    const { count: likeCount, isLoading: isLikeLoading } = useAnswerReactionCountQuery(qnaId, answerId, 'LIKE');
    const { count: dislikeCount, isLoading: isDislikeLoading } = useAnswerReactionCountQuery(qnaId, answerId, 'DISLIKE');

    // 좋아요/싫어요 추가 뮤테이션
    const addReactionMutation = useAddAnswerReactionMutation(qnaId);

    // 반응 토글 처리
    const handleReaction = (type: AnswerReactionType) => {
        // 로그인하지 않은 경우 로그인 안내
        if (!isLogin) {
            showToast.warning('로그인 후 이용 가능한 기능입니다.');
            return;
        }

        // 본인이 작성한 답변인 경우 경고창 표시
        if (isMine) {
            showToast.warning('본인이 작성한 답변에는 좋아요/싫어요를 평가할 수 없습니다.');
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
    }; return (
        <div className="flex items-center gap-4 mt-2 flex-col sticky top-0 h-40 w-32">
            <button
                className={`flex items-center gap-1 py-1 px-2 rounded-md ${currentReaction === 'LIKE'
                    ? 'bg-blue-100 text-blue-700'
                    : !isLogin
                        ? 'bg-gray-100 cursor-not-allowed opacity-60'
                        : isMine
                            ? 'bg-gray-100 cursor-not-allowed opacity-60'
                            : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                onClick={() => handleReaction('LIKE')}
                disabled={isLikeLoading || addReactionMutation.isPending || isMine || !isLogin}
                title={
                    !isLogin
                        ? '로그인 후 이용 가능한 기능입니다'
                        : isMine
                            ? '본인이 작성한 답변에는 평가할 수 없습니다'
                            : '이 답변 추천하기'
                }
            >
                <FiThumbsUp size={16} />
                <span>{likeCount}</span>
            </button>

            <button
                className={`flex items-center gap-1 py-1 px-2 rounded-md ${currentReaction === 'DISLIKE'
                    ? 'bg-red-100 text-red-700'
                    : !isLogin
                        ? 'bg-gray-100 cursor-not-allowed opacity-60'
                        : isMine
                            ? 'bg-gray-100 cursor-not-allowed opacity-60'
                            : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                onClick={() => handleReaction('DISLIKE')}
                disabled={isDislikeLoading || addReactionMutation.isPending || isMine || !isLogin}
                title={
                    !isLogin
                        ? '로그인 후 이용 가능한 기능입니다'
                        : isMine
                            ? '본인이 작성한 답변에는 평가할 수 없습니다'
                            : '이 답변 비추천하기'
                }
            >
                <FiThumbsDown size={16} />
                <span>{dislikeCount}</span>
            </button>
        </div>
    );
};

export default ReactionButtons;
