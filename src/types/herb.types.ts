export interface Herb {
    bneNm: string; // 학명 (예: "Potentilla kleiniana (장미과)")
    cntntsSj: string; // 한글 이름 (예: "가락지나물")
    hbdcNm: string; // 한자 이름 (예: "蛇含(사함)")
    id: number; // 식별자 (예: 180)
    imgUrl1: string; // 이미지 URL 배열
}

export interface HerbDetail {
    bneNm: string; // 학명 (예: "Potentilla kleiniana (장미과)")
    cntntsNo: string; // 콘텐츠 번호 (예: "205058")
    cntntsSj: string; // 한글 이름 (예: "가락지나물")
    hbdcNm: string; // 한자 이름 (예: "蛇含(사함)")
    id: number; // 식별자 (예: 180)
    imgUrls: string[]; // 이미지 URL 배열
    prvateTherpy: string; // 민간 요법 설명
    stle: string; // 형태 및 특징
    useeRegn: string; // 사용 부위
}

export interface HerbSearchCondition {
    bneNm: string;
    search: string;
    month: string;
    sort:string;
    orderBy: string;
}

export enum Month {
    January = "1월",
    February = "2월",
    March = "3월",
    April = "4월",
    May = "5월",
    June = "6월",
    July = "7월",
    August = "8월",
    September = "9월",
    October = "10월",
    November = "11월",
    December = "12월",
}

// 추천 약초 목록
export interface RecommendHerbs {
    answer: string;
    herbName: string;
    id: string;
    priority: string; // 우선 순위
    url: string;
}

// 추천 약초 응답
export interface RecommendHerbResponse {
    answer?:string
    sender: string;
    recommendHerbs: RecommendHerbs[];
    createdAt: string;
}