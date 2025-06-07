import { GiHerbsBundle, GiMedicinePills } from "react-icons/gi";
import { MdNaturePeople, MdTipsAndUpdates } from "react-icons/md";
import { BiSolidMessageDetail } from "react-icons/bi";
import { FaRegLightbulb } from "react-icons/fa";
import { useEffect } from "react";

interface HerbRecommendHeaderProps {
    onStartService?: () => void;
    showInfo?: boolean;
}

export default function HerbRecommendHeader({
    onStartService,
    showInfo = true
}: HerbRecommendHeaderProps) {

    useEffect(() => {
        window.scrollTo({
            top: 0, behavior: 'smooth'
        })
    }, [])
    return (
        <div className={`py-8 pb-12 max-w-[1200px] mx-auto min-h-[90vh] flex flex-col animate-fade-down ${!showInfo ? 'hidden' : ''}`}>
            {/* 헤더 */}
            <div className='flex flex-col md:flex-row justify-between items-center mb-12 gap-6'>
                <div className="text-center md:text-left">
                    <div className="inline-flex items-center bg-[#0ac17b] px-4 py-1.5 rounded-full mb-4 shadow-[inset_-2px_-2px_5px_rgba(0,0,0,0.05)]">
                        <GiMedicinePills className="text-white mr-2" />
                        <span className="bg-[#0ac17b] text-white font-medium">AI 맞춤형 서비스</span>
                    </div>
                    <h1 className="flex items-center text-5xl md:text-6xl md:justify-start justify-center gap-3 font-bold text-gray-800 mb-5 md:mb-6">
                        <MdNaturePeople className="text-primary-green hidden md:block" size={48} />
                        <span>증상별 약초추천</span>
                    </h1>
                    <strong className="text-[#05D182] text-3xl block mb-2">자연의 지혜를 나누는 약초 커뮤니티</strong>
                    <p className="text-gray-600 text-2xl md:max-w-xl">혹시 본인이 경험하는 증상이나 어려움이 있나요? 민초AI가 여러분에게 맞는 약초를 추천해드립니다.</p>
                </div>
                <button
                    onClick={onStartService}
                    className="bg-gradient-to-r from-[#05D182] to-[#03A77F] text-white px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 cursor-pointer font-medium"
                >
                    <GiHerbsBundle className="text-white" size={20} />
                    서비스 이용하기
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* 이용 가이드 */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="bg-[#05D182]/10 p-2 rounded-full">
                            <FaRegLightbulb className="text-primary-green" size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800">이용 가이드</h2>
                    </div>

                    <ul className="space-y-6 mt-6">
                        <li className="flex items-start gap-3">
                            <div className="bg-[#05D182]/10 rounded-full h-6 w-6 flex items-center justify-center mt-0.5">
                                <span className="text-primary-green font-bold">1</span>
                            </div>
                            <p className="text-gray-700 text-2xl">구체적인 증상이나 목적을 입력하세요. (예: "두통이 있어요", "숙면에 도움되는 약초 추천해주세요")</p>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="bg-[#05D182]/10 rounded-full h-6 w-6 flex items-center justify-center mt-0.5">
                                <span className="text-primary-green font-bold">2</span>
                            </div>
                            <p className="text-gray-700 text-2xl">현재 복용중인 약이 있다면 약초 상호작용을 확인하기 위해 함께 알려주세요.</p>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="bg-[#05D182]/10 rounded-full h-6 w-6 flex items-center justify-center mt-0.5">
                                <span className="text-primary-green font-bold">3</span>
                            </div>
                            <p className="text-gray-700 text-2xl">추천 결과에서 "추천" 표시된 약초를 우선적으로 확인하세요.</p>
                        </li>
                    </ul>
                </div>

                {/* 사용 팁 */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="bg-[#05D182]/10 p-2 rounded-full">
                            <MdTipsAndUpdates className="text-primary-green" size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800">효과적인 약초 상담 팁</h2>
                    </div>

                    <ul className="space-y-6 mt-6">
                        <li className="flex items-start gap-3">
                            <div className="flex-shrink-0 bg-[#05D182]/10 p-1 rounded-full">
                                <BiSolidMessageDetail className="text-primary-green" size={16} />
                            </div>
                            <p className="text-gray-700 text-2xl">증상의 강도와 지속 기간을 구체적으로 언급하면 더 정확한 추천을 받을 수 있습니다.</p>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="flex-shrink-0 bg-[#05D182]/10 p-1 rounded-full">
                                <BiSolidMessageDetail className="text-primary-green" size={16} />
                            </div>
                            <p className="text-gray-700  text-2xl">알레르기 반응이 있는 식물이나 약초가 있다면 반드시 상담 시 언급해주세요.</p>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="flex-shrink-0 bg-[#05D182]/10 p-1 rounded-full">
                                <BiSolidMessageDetail className="text-primary-green" size={16} />
                            </div>
                            <p className="text-gray-700  text-2xl">약초 효능에 대해 추가 질문이 있다면 "~에 대해 더 자세히 알려주세요"라고 물어보세요.</p>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="flex-shrink-0 bg-[#05D182]/10 p-1 rounded-full">
                                <BiSolidMessageDetail className="text-primary-green" size={16} />
                            </div>
                            <p className="text-gray-700 text-2xl">체질이나 특정 상황(임신, 수유 등)이 있다면 반드시 언급해 주세요.</p>
                        </li>
                    </ul>
                </div>
            </div>

            {/* 주의사항 안내 */}
            <div className="rounded-xl py-6 px-7 mt-4 text-gray-800 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                    <span className="p-1.5 rounded-md flex items-center justify-center">⚠️</span>
                    <h2 className="font-bold text-3xl ">주의사항 안내(필독)</h2>
                </div>

                <ul className="space-y-3">
                    <li className="text-gray-700 flex items-start gap-2" >
                        <div className="bg-[#a3a7a5]/10 rounded-full h-6 w-6 flex items-center justify-center mt-0.5">
                            <span className="text-primary-green font-bold">1</span>
                        </div>
                        추천된 약초 정보는 <a className="text-[#05D182] border-b border-[#05D182] hover:text-[#03A77F]" href="https://www.nongsaro.go.kr/portal/ps/psz/psza/contentMain.ps?menuId=PS04103&pageUnit=8" target="_blank">농사로</a> 민간약초 컨텐츠에 근거합니다.
                    </li>
                    <li className="text-gray-700 flex items-start gap-2" >
                        <div className="bg-[#a3a7a5]/10 rounded-full h-6 w-6 flex items-center justify-center mt-0.5">
                            <span className="text-primary-green font-bold">2</span>
                        </div>
                        사이트 운영자가 별도로 조사한 데이터 또한 DB에 관리되어 추천 서비스에 활용될 수 있습니다.
                    </li>
                    <li className="text-gray-700 flex items-start gap-2" >
                        <div className="bg-[#a3a7a5]/10 rounded-full h-6 w-6 flex items-center justify-center mt-0.5">
                            <span className="text-primary-green font-bold">3</span>
                        </div>
                        앞서 1, 2항을 고려하여 추천된 약초를 참고하시되, 정확한 복용 방법은 전문가 상담이 필수입니다.
                    </li>
                    <li className="text-gray-700 flex items-start gap-2" >
                        <div className="bg-[#a3a7a5]/10 rounded-full h-6 w-6 flex items-center justify-center mt-0.5">
                            <span className="text-primary-green font-bold">4</span>
                        </div>
                        특정 질병 치료 목적으로 약초를 활용할 경우, 현재 복용 중인 약물과의 상호작용을 반드시 의사와 상담 하십시오.
                    </li>
                    <li className="text-gray-700 flex items-start gap-2" >
                        <div className="bg-[#a3a7a5]/10 rounded-full h-6 w-6 flex items-center justify-center mt-0.5">
                            <span className="text-primary-green font-bold">5</span>
                        </div>
                        본 서비스는 의학적 조언을 대체하지 않으며, 전문가 상담을 권장합니다.
                    </li>
                </ul>
            </div>
        </div>
    )
}