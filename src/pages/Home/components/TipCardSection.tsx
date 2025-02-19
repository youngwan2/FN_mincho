// interface TipCardSectionProps { }

import MoreButton from "./MoreButton";

export default function TipCardSection() {
    return (
        <section className="p-10 items-start">
            <h2 className="text-4xl leading-13">알면 <strong>약이 되는 <br />꿀팁 </strong> 알리오 </h2>
            <MoreButton onClick={()=>alert("이벤트 호출 성공")}/>
            {/* 카드 그룹 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                <div className="bg-[#F9F9F9] p-6 rounded-2xl">
                    <h3 className="text-2xl font-bold">물주기</h3>
                    <p className="mt-4 text-base">물을 주는 방법에 따라 식물의 생명이 달라집니다. </p>
                </div>
                <div className="bg-[#F9F9F9] p-6 rounded-2xl">
                    <h3 className="text-2xl font-bold">햇빛</h3>
                    <p className="mt-4 text-base">식물에게 가장 중요한 것은 햇빛입니다. </p>
                </div>
                <div className="bg-[#F9F9F9] p-6 rounded-2xl">
                    <h3 className="text-2xl font-bold">토양</h3>
                    <p className="mt-4 text-base">토양은 식물의 뿌리를 담당합니다. </p>
                </div>
            </div>
        </section>
    )
}