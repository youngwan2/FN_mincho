import { PostStatistics } from "../types/post.types";

export const getCategoryName = (categoryInfos: PostStatistics[], activeCategory: string) => {
    const category = categoryInfos.find(cat => cat.category === activeCategory)?.category;

    switch (category) {
        case 'info':
            return "정보 공유";
        case 'notice':
            return "공지사항";
        case 'free':
            return "자유게시판";
        case 'question':
            return "질문 & 답변";
        default:
            return "전체"; // 기본값 설정
    }
}