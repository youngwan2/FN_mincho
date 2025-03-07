
// 타입 정의
export type Category = {
    id: string;
    name: string;
    count: number;
};


// 추가 포스트
export interface PostRequest {
    category:'notice' | 'info' | 'free' | 'question' | 'share';
    title:string;
    author:string;
}


// 포스트
export interface Post {
    id: number;
    category: string;
    categoryType:'notice' | 'info' | 'free' | 'question' | 'share' ;
    title: string;
    author: string;
    date: string;
    commentCount: number;
    viewCount: number;
    likeCount: number;
};

// 포스트 검색 조건
export interface PostSearchCondition {
    orderBy: string;
    category: string

}