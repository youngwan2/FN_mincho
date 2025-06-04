export interface AnswerSummary {
    id: number;
    writer: string;
    isAdopted: boolean;
    isMine: boolean;
    createdAt: string; // ISO 날짜 문자열
}

export interface QnaSummary {
    id: number;
    title: string;
    content: string;
    isPrivate: boolean;
    isMine: boolean;
    writer: string;
    imageUrls: string[];
    answers: AnswerSummary[];
    createdAt: string; // ISO 날짜 문자열
    view: number;
}

export interface QnaListResponse {
    qnas: QnaSummary[];
    totalCount: number;
}

export interface QnaSearchCondition {
    keyword?: string;
    searchType?: string;
    fromDate?: string;
    toDate?: string;
}

export interface AnswerDetail {
    id: number;
    content: string;
    writer: string;
    isAdopted: boolean;
    isMine: boolean;
    createdAt: string; // ISO 날짜 문자열
    images: string[];
    userReaction?: string | null; // 사용자가 해당 답변에 남긴 반응 (LIKE/DISLIKE/null)
    likeCount?: number; // 좋아요 개수
    dislikeCount?: number; // 싫어요 개수
}


export interface QnaDetail {
    id: number;
    title: string;
    content: string;
    isPrivate: boolean;
    isMine: boolean;
    writer: string;
    avatarUrl?: string; // 작성자의 아바타 URL
    imageUrls: string[];
    answers: AnswerDetail[];
    createdAt: string; // ISO 날짜 문자열
    view: number;
}