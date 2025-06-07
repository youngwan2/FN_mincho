import { useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { GiHerbsBundle, GiPlantRoots } from "react-icons/gi";
import { MdTipsAndUpdates } from "react-icons/md";
import { BiSolidMessageDetail } from "react-icons/bi";
import { FaRegLightbulb } from "react-icons/fa";

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function InfoModal({ isOpen, onClose }: InfoModalProps) {
    useEffect(() => {
        // 모달이 열렸을 때 body 스크롤 방지
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1100] flex items-center justify-center p-4 overflow-y-auto">
            <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-fade-down animate-duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 bg-white p-5 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <GiPlantRoots className="text-primary-green" />
                        약초 추천 서비스 안내
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <IoMdClose size={24} />
                    </button>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 gap-6 mb-8">
                        {/* 이용 가이드 */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="bg-[#05D182]/10 p-2 rounded-full">
                                    <FaRegLightbulb className="text-primary-green" size={24} />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">이용 가이드</h2>
                            </div>

                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="bg-[#05D182]/10 rounded-full h-6 w-6 flex items-center justify-center mt-0.5">
                                        <span className="text-primary-green font-bold">1</span>
                                    </div>
                                    <p className="text-gray-700">구체적인 증상이나 목적을 입력하세요. (예: "두통이 있어요", "숙면에 도움되는 약초 추천해주세요")</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="bg-[#05D182]/10 rounded-full h-6 w-6 flex items-center justify-center mt-0.5">
                                        <span className="text-primary-green font-bold">2</span>
                                    </div>
                                    <p className="text-gray-700">현재 복용중인 약이 있다면 약초 상호작용을 확인하기 위해 함께 알려주세요.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="bg-[#05D182]/10 rounded-full h-6 w-6 flex items-center justify-center mt-0.5">
                                        <span className="text-primary-green font-bold">3</span>
                                    </div>
                                    <p className="text-gray-700">추천 결과에서 "추천" 표시된 약초를 우선적으로 확인하세요.</p>
                                </li>
                            </ul>
                        </div>

                        {/* 사용 팁 */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="bg-[#05D182]/10 p-2 rounded-full">
                                    <MdTipsAndUpdates className="text-primary-green" size={24} />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">효과적인 약초 상담 팁</h2>
                            </div>

                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="flex-shrink-0 bg-[#05D182]/10 p-1 rounded-full">
                                        <BiSolidMessageDetail className="text-primary-green" size={16} />
                                    </div>
                                    <p className="text-gray-700">증상의 강도와 지속 기간을 구체적으로 언급하면 더 정확한 추천을 받을 수 있습니다.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="flex-shrink-0 bg-[#05D182]/10 p-1 rounded-full">
                                        <BiSolidMessageDetail className="text-primary-green" size={16} />
                                    </div>
                                    <p className="text-gray-700">알레르기 반응이 있는 식물이나 약초가 있다면 반드시 상담 시 언급해주세요.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="flex-shrink-0 bg-[#05D182]/10 p-1 rounded-full">
                                        <BiSolidMessageDetail className="text-primary-green" size={16} />
                                    </div>
                                    <p className="text-gray-700">약초 효능에 대해 추가 질문이 있다면 "~에 대해 더 자세히 알려주세요"라고 물어보세요.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="flex-shrink-0 bg-[#05D182]/10 p-1 rounded-full">
                                        <BiSolidMessageDetail className="text-primary-green" size={16} />
                                    </div>
                                    <p className="text-gray-700">체질이나 특정 상황(임신, 수유 등)이 있다면 반드시 언급해 주세요.</p>
                                </li>
                            </ul>
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

                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={onClose}
                            className="bg-gradient-to-r from-[#05D182] to-[#03A77F] text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 cursor-pointer font-medium"
                        >
                            <GiHerbsBundle className="text-white" size={20} />
                            확인했습니다
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
