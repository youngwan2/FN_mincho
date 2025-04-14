import { useState } from "react";
import { IoRefreshOutline } from "react-icons/io5";

const allSuggestions = [
  "두통에 좋은 약초",
  "수면에 도움되는 약초",
  "스트레스 완화 약초",
  "소화에 좋은 약초",
  "면역력 강화 약초",
  "피로 회복에 좋은 약초",
  "혈액순환 개선 약초",
  "다이어트에 좋은 약초",
  "간 건강에 좋은 약초",
  "여성 건강을 위한 약초",
  "노화 방지 약초",
  "기억력 향상 약초",
  "눈 건강에 좋은 약초",
  "항산화 효과가 있는 약초",
  "감기 예방에 좋은 약초",
  "혈압 조절에 좋은 약초",
  "당뇨 예방에 도움 되는 약초",
  "탈모 예방 약초",
  "체온 조절을 돕는 약초",
  "불면증 개선 약초",
  "장 건강에 좋은 약초",
  "해독 작용을 돕는 약초",
  "천연 진통 효과가 있는 약초",
  "피부 건강에 좋은 약초",
  "호흡기 건강에 좋은 약초",
  "관절 통증 완화 약초",
  "면역세포 활성화 약초",
  "간 해독을 돕는 약초",
  "기운을 북돋는 약초",
  "기관지에 좋은 약초",
  "염증 완화에 효과적인 약초",
  "빈혈 예방에 좋은 약초",
  "성인병 예방에 도움되는 약초",
  "장염 증상 완화 약초",
  "우울감 개선에 좋은 약초",
  "집중력 향상 약초",
  "에너지 회복에 좋은 약초",
  "자연스러운 진정 효과가 있는 약초",
  "변비 완화에 좋은 약초",
  "비염 완화에 효과적인 약초",
  "천연 항생제 역할을 하는 약초",
  "이뇨 작용을 돕는 약초",
  "손발 냉증 완화 약초",
  "골다공증 예방 약초",
  "두드러기 완화에 좋은 약초",
  "속쓰림 완화에 좋은 약초",
  "체력 보강에 좋은 약초",
  "목 통증에 효과적인 약초",
  "스트레스로 인한 소화불량에 좋은 약초",
  "생리통 완화에 좋은 약초",
  "간염 예방에 좋은 약초",
  "기침 완화에 효과적인 약초",
  "입 냄새 제거에 좋은 약초",
  "여드름 완화에 좋은 약초",
  "천식 증상 완화 약초",
  "두근거림 완화에 좋은 약초",
  "소화불량 개선에 효과적인 약초",
  "장내 유익균 증식에 좋은 약초",
  "만성 피로 완화에 효과적인 약초",
  "갱년기 증상 완화 약초",
  "근육통 완화에 좋은 약초",
  "정력 강화에 좋은 약초",
  "트림을 줄여주는 약초",
  "불안 완화에 효과적인 약초",
  "간 기능 회복을 돕는 약초",
  "편두통 완화에 좋은 약초",
  "환절기 면역력 강화 약초",
  "빈속에도 편안한 약초",
  "다리 붓기 완화에 좋은 약초",
  "콜레스테롤 조절에 도움 되는 약초",
  "만성 스트레스 완화 약초",
  "장시간 앉아있는 사람에게 좋은 약초",
  "두피 건강에 좋은 약초",
  "비타민C 풍부한 약초",
  "자율신경 조절에 도움 되는 약초",
  "청소년 집중력 향상 약초",
  "갓난아이 산모에게 좋은 약초",
  "감정 기복 완화에 좋은 약초",
  "혈당 조절을 돕는 약초",
  "몸속 독소 배출에 좋은 약초",
];

function getRandomSuggestions(list: string[], count: number) {
  // 결과가 양수면 b가 앞으로 → a, b 위치 바뀜이를 이용해 간단한 섞기를 수행하는 것
  const shuffled = [...list].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function SuggestionBox({ setInput }: { setInput: (text: string) => void }) {
  const [suggestions, setSuggestions] = useState(() =>
    getRandomSuggestions(allSuggestions, 10)
  );

  const handleRefresh = () => {
    setSuggestions(getRandomSuggestions(allSuggestions, 10));
  };

  return (
    <div className="p-4 rounded-md w-full ">
      <div className="flex items-center justify-between w-full mb-5">
        <h2 className="text-2xl font-semibold">이 주제는 어떤가요?</h2>
        <button
          onClick={handleRefresh}
          className="mt-4 px-4 py-2 bg-primary-green text-white rounded hover:bg-hover-primary-green"
        >
          <IoRefreshOutline />
        </button>
      </div>

      <ul className="flex pl-5 space-y-1 text-gray-700 gap-2  flex-wrap">
        {suggestions.map((item, idx) => (
          <li onClick={()=> setInput(item)} className="border border-gray-200 p-1 px-3 rounded-2xl hover:bg-gray-100 cursor-pointer" key={idx}>{item}</li>
        ))}
      </ul>

    </div>
  );
}