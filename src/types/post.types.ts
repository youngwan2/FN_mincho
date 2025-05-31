
// 타입 정의
export type Category = {
    id: number;
    name: string;
    type: string
    description: string;
    count?: number;
};


// 포스트 카테고리
export type CategoryType = 'notice' | 'info' | 'free' | 'question'
// 추가 포스트
export interface PostRequest {
    categoryType: CategoryType
    contents: string
    title: string;

}


// 포스트
export interface Post {
    id: number;
    category: Category;
    title: string;
    nickname?: string

    author: {
        id: number
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
    categoryId: number

}


// 카테고리 타입
export interface PostStatistics {
    id: number
    type: string
    name: string
    description: string
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

