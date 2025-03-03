import { Post } from "../types/post.types";

 // 게시글 데이터
 export const posts: Post[] = [
    {
      id: 1,
      category: '정보 공유',
      categoryType: 'info',
      title: '천연 약초를 활용한 호흡기 건강 관리법 [+8]',
      author: '홍길동',
      date: '2025.03.03',
      commentCount: 8,
      viewCount: 128,
      likeCount: 24
    },
    {
      id: 2,
      category: '정보 공유',
      categoryType: 'info',
      title: '봄철 약초 채취 꿀팁 - 초보자도 쉽게 알아보는 방법 [+12]',
      author: '이몽룡',
      date: '2025.03.02',
      commentCount: 12,
      viewCount: 215,
      likeCount: 42
    },
    {
      id: 3,
      category: '공지사항',
      categoryType: 'notice',
      title: '[필독] 약초 채취 시 주의사항 및 법적 규제 안내',
      author: '관리자',
      date: '2025.02.28',
      commentCount: 3,
      viewCount: 432,
      likeCount: 65
    },
    {
      id: 4,
      category: '정보 공유',
      categoryType: 'info',
      title: '도라지와 더덕의 효능 차이점 - 전문가가 알려드립니다 [+5]',
      author: '성춘향',
      date: '2025.02.27',
      commentCount: 5,
      viewCount: 187,
      likeCount: 35
    },
    {
      id: 5,
      category: '정보 공유',
      categoryType: 'info',
      title: '제철 봄나물 10종과 약효 정리 (사진 포함) [+15]',
      author: '김철수',
      date: '2025.02.25',
      commentCount: 15,
      viewCount: 254,
      likeCount: 48
    },
    {
      id: 6,
      category: '정보 공유',
      categoryType: 'info',
      title: '집에서 쉽게 기르는 약용 식물 5가지 [+7]',
      author: '박지성',
      date: '2025.02.23',
      commentCount: 7,
      viewCount: 198,
      likeCount: 31
    },
    {
      id: 7,
      category: '정보 공유',
      categoryType: 'info',
      title: '약초 보관법 - 효능을 오래 유지하는 비법 [+10]',
      author: '윤동주',
      date: '2025.02.20',
      commentCount: 10,
      viewCount: 176,
      likeCount: 29
    },
    {
      id: 8,
      category: '정보 공유',
      categoryType: 'info',
      title: '계절별 약초 채취 달력 (3월~5월 업데이트) [+6]',
      author: '정약용',
      date: '2025.02.18',
      commentCount: 6,
      viewCount: 215,
      likeCount: 37
    },
  ];