import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { GiHerbsBundle, GiMedicinePills, GiPlantRoots } from 'react-icons/gi';
import { motion } from 'framer-motion';

export default function HerbRecommendPreview() {
    return (
        <div
            className="py-16 bg-gradient-to-t from-green-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ translateX: -50, opacity: 0 }}
                    whileInView={{ translateX: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-center animate-fade-down">
                    <GiHerbsBundle className="mx-auto h-16 w-16 text-[#05D182]" />
                    <h2 className="mt-2 text-4xl font-extrabold text-gray-900">
                        약초 추천 서비스
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-2xl text-gray-500">
                        개인 맞춤형 약초 추천이 필요하신가요? AI민초가 도와드립니다!
                    </p>
                </motion.div>

                <motion.div
                    initial={{ translateY: 30, opacity: 0 }}
                    whileInView={{ translateY: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="mt-16">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-fade-up animate-delay-100">
                            <div className="px-6 py-8">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#05D182] text-white mx-auto">
                                    <GiHerbsBundle className="h-6 w-6" />
                                </div>
                                <h3 className="mt-6 text-center text-3xl font-medium text-gray-900">
                                    개인 맞춤형 상담
                                </h3>
                                <p className="mt-4 text-gray-500 text-center">
                                    증상이나 필요에 맞는 약초를 AI가 맞춤형으로 추천해드립니다.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-fade-up animate-delay-200">
                            <div className="px-6 py-8">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#05D182] text-white mx-auto">
                                    <GiMedicinePills className="h-6 w-6" />
                                </div>
                                <h3 className="mt-6 text-center text-3xl font-medium text-gray-900">
                                    다양한 약초 정보
                                </h3>
                                <p className="mt-4 text-gray-500 text-center">
                                    각종 효능과 활용법을 포함한 자세한 약초 정보를 제공합니다.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-fade-up animate-delay-300">
                            <div className="px-6 py-8">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#05D182] text-white mx-auto">
                                    <GiPlantRoots className="h-6 w-6" />
                                </div>
                                <h3 className="mt-6 text-center text-3xl font-medium text-gray-900">
                                    즉각적인 응답
                                </h3>
                                <p className="mt-4 text-gray-500 text-center">
                                    AI 민초가 빠르고 정확한 답변을 실시간으로 제공합니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="mt-12 text-center animate-fade-up animate-delay-500">
                    <Link to="/chat/herbs-recommend">
                        <Button className="bg-gradient-to-r from-[#05D182] to-[#03A77F] text-white px-10 py-8 text-2xl rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                            <GiHerbsBundle className="mr-2 h-10 w-10" /> 약초 추천 받기
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
