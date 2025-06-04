import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../config/keys";
import { getAnswerReactionCount } from "../../service/answer-reaction.service";
import { AnswerReactionType } from "../../types/answer-reaction.types";

// 답변 반응 개수 조회 쿼리 훅
export const useAnswerReactionCountQuery = (answerId: number, type: AnswerReactionType) => {
    const {
        data: count = 0,
        isError,
        isLoading,
    } = useQuery({
        queryKey: queryKeys.answerReaction.getCount(answerId, type),
        queryFn: () => getAnswerReactionCount(answerId, type),
    });

    return {
        count,
        isError,
        isLoading,
    };
};
