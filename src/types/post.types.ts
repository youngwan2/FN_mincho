
// 타입 정의
export type Category = {
    id: string;
    name: string;
    count: number;
};


// 포스트 카테고리
export type CategoryType = 'notice' | 'info' | 'free' | 'question'
// 추가 포스트
export interface PostRequest {
    category: CategoryType
    contents: string
    title: string;

}


// 포스트
export interface Post {
    id: number;
    category: string;
    categoryType: CategoryType
    title: string;
    nickname?: string
    author: {
        nickname: string
        profileImage: string
    }
    createdAt: string;
    commentCount: number;
    isMine?: boolean;
    viewCount: number;
    likeCount: number;
};

// 포스트 상세
export interface PostDetail extends Post {
    contents?: string
}


// 포스트 검색 조건
export interface PostSearchCondition {
    order: string;
    sort: string
    queryType?: string
    query?: string | null
    category: string

}


// 카테고리 타입
export interface PostStatistics {
    category: string
    count: number
}


// 포스트 페치 상태
export interface PostFetchState {
    isError: boolean
    isLoading: boolean
    status: string
}


// 마이페이지 사용자 포스트
export interface MypagePost {
    id: number;
    title: string;
    createdAt: string;
}