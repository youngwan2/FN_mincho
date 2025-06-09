import DetailPost from "./components/detail/DetailPost";
import RelatedPostList from "./components/detail/RelatedPostList";
import CommunityHeader from "./components/main/CommunityHeader";

export default function CommunityDetailPage() {
  return (
    <section className="min-h-screen w-full px-4 md:px-10 lg:px-12 pb-10 animate-fade-down">
      <div className="mx-auto py-6">
        {/* 헤더 - 메인 페이지와 동일한 헤더 사용 */}
        <CommunityHeader />

        {/* 상세 페이지 내용 */}
        <div className="mt-12">
          <DetailPost />
          <RelatedPostList />
        </div>
      </div>
    </section>
  );
}