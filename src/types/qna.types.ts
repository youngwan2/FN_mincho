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
    hasAdoptedAnswer: boolean; // 채택된 답변이 있는지 여부
    writer: string;
    imageUrls: string[];
    answers: AnswerSummary[];
    tags: string[]; // 태그 목록
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
    categoryId?: number;
    tag?: string;
}

export interface AnswerDetail {
    id: number;
    content: string;
    writerId: number; // 작성자의 ID
    writer: string;
    isAdopted: boolean;
    isMine: boolean;
    avatarUrl?: string; // 작성자의 아바타 URL
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
    writerId: number;
    writer: string;
    avatarUrl?: string; // 작성자의 아바타 URL
    imageUrls: string[];
    answers: AnswerDetail[];
    tags: string[]; // 태그 목록
    createdAt: string; // ISO 날짜 문자열
    categoryId: number;
    categoryName: string;
    view: number;
}

// QnA 카테고리 타입 정의
export interface QnaCategory {
    id: number;
    name: string;
    description: string;
}