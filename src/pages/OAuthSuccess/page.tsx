import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { setToken } from "../../utils/storage";

const OAuthSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = searchParams.get("token");
        if (accessToken) {
            setToken(accessToken) // 토큰 저장
            navigate("/"); // 홈 또는 원하는 페이지로 이동
            setTimeout(() => {
                location.reload(); // 페이지 새로고침   
            }, 2000)

        } else {
            // 에러 처리
            console.error("토큰 없음");
        }
    }, [searchParams]);

    return (
        <section className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <div className="text-center">
                <div className="mb-6">
                    <svg
                        className="w-24 h-24 mx-auto"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* 원형 배경 */}
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#e0e0e0"
                            strokeWidth="8"
                        />

                        {/* 회전하는 로딩 원호 */}
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#4f46e5"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray="251.2"
                            strokeDashoffset="125.6"
                            className="animate-spin origin-center"
                            style={{
                                transformOrigin: 'center',
                                animation: 'spin 1.5s linear infinite'
                            }}
                        >
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                from="0 50 50"
                                to="360 50 50"
                                dur="1.5s"
                                repeatCount="indefinite"
                            />
                        </circle>

                        {/* 중앙 아이콘 (예: 체크마크) */}
                        <path
                            d="M35,50 L45,60 L65,40"
                            stroke="#4f46e5"
                            strokeWidth="6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            opacity="0"
                        >
                            <animate
                                attributeName="opacity"
                                values="0;0;1"
                                dur="2s"
                                repeatCount="indefinite"
                                keyTimes="0;0.7;1"
                            />
                        </path>
                    </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">로그인 중...</h2>
                <p className="text-gray-600">소셜 로그인 정보를 확인하고 있습니다.</p>
            </div>
        </section>
    );
};

export default OAuthSuccessPage;
