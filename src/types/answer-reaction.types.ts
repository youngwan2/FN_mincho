export type AnswerReactionType = 'LIKE' | 'DISLIKE';

export interface AnswerReactionRequest {
    type: AnswerReactionType;
}

export interface AnswerReactionResponse {
    count: number;
    userReacted: boolean;
}
