export type AnswerReactionType = 'LIKE' | 'DISLIKE';

export interface AnswerReactionRequest {
    reactionType: AnswerReactionType;
}

export interface AnswerReactionResponse {
    count: number;
    userReacted: boolean;
}
