import { TbDatabaseOff, TbHome, TbSearch, TbPlant2, TbSparkles, TbQuestionMark } from 'react-icons/tb';
import { Link } from 'react-router';

export default function PageNotFoundCard() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-8">
            <div className="max-w-2xl w-full text-center">
                {/* 떠다니는 장식 요소들 */}
                <div className="relative mb-12">
                    <div className="absolute -top-8 -left-8 text-green-300 animate-bounce">
                        <TbPlant2 size={24} />
                    </div>
                    <div className="absolute -top-4 -right-12 text-emerald-300 animate-pulse">
                        <TbSparkles size={20} />
                    </div>
                    <div className="absolute -bottom-6 left-16 text-teal-300 animate-bounce delay-300">
                        <TbPlant2 size={18} />
                    </div>
                    <div className="absolute -bottom-8 -right-8 text-green-400 animate-pulse delay-500">
                        <TbSparkles size={16} />
                    </div>

                    {/* 메인 아이콘 */}
                    <div className="relative inline-flex items-center justify-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-2xl">
                            <TbDatabaseOff size={64} className="text-white" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-yellow-800 text-xl font-bold">!</span>
                        </div>
                    </div>
                </div>

                {/* 제목 */}
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    페이지를 찾을 수 없습니다
                </h1>

                {/* 부제목 */}
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    요청하신 약초 정보나 게시글을 찾을 수 없어요.<br />
                    링크가 잘못되었거나 페이지가 이동되었을 수 있습니다.
                </p>

                {/* 에러 코드 */}
                <div className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full text-2xl font-medium mb-12">
                    404 오류
                </div>

                {/* 버튼들 */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link to={"/"} className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-w-[200px]">
                        <TbHome size={20} />
                        홈으로 돌아가기
                    </Link>

                    <Link to={"/herbs"} className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-emerald-300 hover:text-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-w-[200px]">
                        <TbSearch size={20} />
                        약초 검색하기
                    </Link>
                </div>

                {/* 도움말 텍스트 */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-xl text-gray-500">
                        계속 문제가 발생한다면{' '}
                        <a href="https://forms.gle/ApM2zdG9nonzdiSn7" target='_blank' className="text-emerald-600 hover:text-emerald-700 font-medium underline decoration-2 underline-offset-2">
                            고객센터
                        </a>
                        로 문의해 주세요.
                    </p>
                </div>

                {/* 추천 링크들 */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                    <Link to={"/herbs"} className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 hover:bg-white/80 transition-all duration-300 cursor-pointer">
                        <TbPlant2 className="text-green-500 mx-auto mb-2" size={24} />
                        <p className="text-xl font-medium text-gray-700">약초도감</p>
                    </Link>
                    <Link to={"/chat/herbs-recommend"} className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 hover:bg-white/80 transition-all duration-300 cursor-pointer">
                        <TbSearch className="text-emerald-500 mx-auto mb-2" size={24} />
                        <p className="text-xl font-medium text-gray-700">추천약초</p>
                    </Link>
                    <Link to={"/community/qnas"} className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 hover:bg-white/80 transition-all duration-300 cursor-pointer">
                        <TbQuestionMark className="text-emerald-500 mx-auto mb-2" size={24} />
                        <p className="text-xl font-medium text-gray-700">QnA</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};
