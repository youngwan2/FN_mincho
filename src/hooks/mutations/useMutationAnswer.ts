import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createAnswer, updateAnswer, deleteAnswer, adoptAnswer } from "../../service/answer.service";
import { handleError } from "../../config/error";
import { queryKeys } from "../../config/keys";

// 답변 생성 mutation
export function useCreateAnswerMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ qnaId, answerData }: { qnaId: number; answerData: any }) =>
            createAnswer(qnaId, answerData),
        onSuccess: (_, variables) => {
            toast.success("답변이 등록되었습니다.");
            queryClient.invalidateQueries({
                queryKey: queryKeys.qna.getById(variables.qnaId)
            });
        },
        onError: handleError,
    });
}

// 답변 수정 mutation
export function useUpdateAnswerMutation(qnaId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ answerId, answerData }: { answerId: number; answerData: any }) =>
            updateAnswer(answerId, answerData),
        onSuccess: () => {
            toast.success("답변이 수정되었습니다.");
            queryClient.invalidateQueries({
                queryKey: queryKeys.qna.getById(qnaId)
            });
        },
        onError: handleError,
    });
}

// 답변 삭제 mutation
export function useDeleteAnswerMutation(qnaId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (answerId: number) => deleteAnswer(answerId),
        onSuccess: () => {
            toast.success("답변이 삭제되었습니다.");
            queryClient.invalidateQueries({
                queryKey: queryKeys.qna.getById(qnaId)
            });
        },
        onError: handleError,
    });
}

// 답변 채택 mutation
export function useAdoptAnswerMutation(qnaId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (answerId: number) => adoptAnswer(answerId),
        onSuccess: () => {
            toast.success("답변이 채택되었습니다.");
            queryClient.invalidateQueries({
                queryKey: queryKeys.qna.getById(qnaId)
            });
        },
        onError: handleError,
    });
}
