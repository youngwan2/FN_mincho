const month = {
    "1월": "1월",
    "2월": "2월",
    "3월": "3월",
    "4월": "4월",
    "5월": "5월",
    "6월": "6월",
    "7월": "7월",
    "8월": "8월",
    "9월": "9월",
    "10월": "10월",
    "11월": "11월",
    "12월": "12월",
  } as const;
  
  export type MonthType = keyof typeof month;
  
//   // 사용 예시
//   const : MonthType = "2월";
//   console.log(월[현재월]); // '2월'