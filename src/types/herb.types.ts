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
