
// 타입 정의
export type Category = {
    id: string;
    name: string;
    count: number;
};

export interface Post{
    id: number;
    category: string;
    categoryType: 'notice' | 'info' | 'free' | 'question' | 'share';
    title: string;
    author: string;
    date: string;
    commentCount: number;
    viewCount: number;
    likeCount: number;
};