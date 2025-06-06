import QnaEditor from "@/components/editor/QnaEditor";
import { FaLeaf } from "react-icons/fa";
import useAuth from "@/hooks/useAuth";
import { Link } from "react-router";

export default function QnaWritePage() {
    const isLogin = useAuth(); // 로그인 상태 확인

    if (!isLogin) {
        return (
            <div className="mx-auto mt-13 p-6 flex flex-col items-center min-h-screen">
                <div className="text-center mt-30">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">로그인이 필요한 서비스입니다</h1>
                    <p className="text-gray-600 mb-8">Q&A 질문을 작성하려면 로그인이 필요합니다.</p>
                    <div className="p-6 rounded-lg max-w-md mx-auto">
                        <p className="text-gray-800 mb-4">로그인 후 약초 관련 질문을 작성하실 수 있습니다.</p>
                        <div className="flex flex-col gap-4">
                            <Link
                                to="/auth/login"
                                className="inline-block px-6 py-3 bg-primary-green hover:bg-hover-primary-green text-white rounded-md transition-colors"
                            >
                                로그인 페이지로 이동
                            </Link>
                            <Link
                                to="/community/qnas"
                                className="inline-block px-6 py-3 border-primary-green text-hover-primary-green rounded-md transition-colors"
                            >
                                이전 페이지로 이동
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className=" mx-auto mt-13 p-6">
            <div className="mb-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Q&A 질문작성</h1>
                <p className="text-gray-600">약초 관련 질문을 남겨보세요.</p>
                <div className="text-green-800 mt-4 bg-green-50 p-4 rounded-lg">
                    <h2 className="flex gap-2 items-center text-2xl"><FaLeaf /> <strong>좋은 약초 질문 작성 가이드</strong></h2>

                    <ul className="pl-6 mt-2 ">
                        <li>• 질문의 목적을 명확히 하세요</li>
                        <li>• 필요한 정보(약초 이름, 증상 등)를 포함하세요</li>
                        <li>• 관련된 배경 지식을 제공하세요</li>
                        <li>• 구체적인 예시를 들어주세요</li>
                        <li>• 질문을 간결하게 작성하세요</li>
                    </ul>

                </div>
            </div>
            <QnaEditor type="question" />
        </div>
    )
}