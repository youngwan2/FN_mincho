import { Category } from "../types/community.types";


export const herbCategories = [
  "장미과", "소태나무과", "가지과", "벼과", "감나무과", "콩과", "십자화과", "개구리밥과", "다래나무과",
  "미나리과", "고사리과", "물레나물과", "꿀풀과", "물푸레나무과", "괭이밥과", "국화과", "마디풀과", "뽕나무과",
  "미나리아재비과", "돌나물과", "현삼과", "노루발풀과", "곡정초과", "갈매나무과", "초롱꽃과",
  "백합과", "인동과", "마과", "마타리과", "매자나무과", "비름과", "포도과", "명아주과", "배나무과",
  "작약과", "아욱과", "부처손과", "범의귀과", "박과", "천남성과", "참나무과", "목련과", "운향과", "석류풀과",
  "붓꽃과", "패랭이꽃과"
];


export const monthCategories = [
  "1월", "2월", "3월", "4월", "5월", "6월",
  "7월", "8월", "9월", "10월", "11월", "12월"
];

    // 카테고리 데이터
export const communityCategories: Category[] = [
      { id: 'all', name: '전체 글', count: 489 },
      { id: 'notice', name: '공지사항', count: 23 },
      { id: 'info', name: '정보 공유', count: 156 },
      { id: 'free', name: '자유게시판', count: 215 },
      { id: 'question', name: '질문 & 답변', count: 67 },
      { id: 'share', name: '나눔 & 거래', count: 28 },
  ];