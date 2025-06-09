import useAuth from "@/hooks/useAuth";
import Editor from "../../components/editor/Editor";
import { Link } from "react-router";

export default function CommunityWritePage() {
    const isAuth = useAuth();

    if (isAuth === false) {
        return (
            <section className="min-h-screen w-full px-4 md:px-10 lg:px-12 pb-10 mt-12">
                <div className="w-full p-10 rounded-2xl mb-15 bg-white border flex flex-col items-center">
                    <h1 className="text-3xl font-bold mb-4">로그인이 필요합니다</h1>
                    <p>커뮤니티 글 작성을 위해서는 로그인이 필요합니다.</p>
                    <Link to="/auth/login" className="text-primary-green hover:underline mt-4 inline-block">
                        로그인 하러 가기</Link>
                </div>
            </section>
        )
    }
    return (
        <section className="min-h-screen w-full px-4 md:px-10 lg:px-12 pb-10 mt-12">
            <div className="w-full bg-primary-green text-white p-10 rounded-2xl mb-15">
                <h1 className="text-5xl font-bold mb-4 ">티끌 같은 지식도 모이면 태산</h1>
                <p className="">작은 지식도 모이면 큰 힘이 됩니다. 집단 지성의 힘으로 탄탄한 지식을 쌓아갑시다</p>
            </div>
            <Editor formType="create" />
        </section>

    )
}