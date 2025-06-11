import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addAnswerReaction, cancelAnswerReaction } from "@/service/answer-reaction.service";
import { handleError } from "@/config/error";
import { AnswerReactionRequest } from "@/types/answer-reaction.types";

// 답변에 반응 추가 뮤테이션 훅
export function useAddAnswerReactionMutation(qnaId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ answerId, requestDTO }: { answerId: number; requestDTO: AnswerReactionRequest }) =>
            addAnswerReaction(qnaId, answerId, requestDTO), onSuccess: (_, variables) => {
                const reactionType = variables.requestDTO.reactionType === 'LIKE' ? '좋아요' : '싫어요';
                toast.success(`답변에 ${reactionType} 반응이 추가되었습니다.`);
                queryClient.invalidateQueries({
                    queryKey: ["answerReaction"]
                });
            },
        onError: handleError,
    });
}

// 답변 반응 취소 뮤테이션 훅
export function useCancelAnswerReactionMutation(qnaId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (answerId: number) => cancelAnswerReaction(qnaId, answerId),
        onSuccess: () => {
            toast.success("답변에 대한 반응이 취소되었습니다.");
            queryClient.invalidateQueries({
                queryKey: ["answerReaction"]
            });
        },
        onError: handleError,
    });
}
