import Editor from "../../components/editor/Editor";

export default function CommunityWritePage() {
    return (
        <section className="min-h-screen w-full">
            <div className="w-full bg-primary-green text-white p-10 rounded-2xl mb-15">
                <h1 className="text-5xl font-bold mb-4 ">티끌 같은 지식도 모이면 태산</h1>
                <p className="">작은 지식도 모이면 큰 힘이 됩니다. 집단 지성의 힘으로 탄탄한 지식을 쌓아갑시다</p>
            </div>
            <Editor formType="create" />
        </section>

    )
}