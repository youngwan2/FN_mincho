import DetailPost from "./components/detail/DetailPost";
import RelatedPostList from "./components/detail/RelatedPostList";

export default function CommunityDetailPage() {

  return (

    <div className="w-full mx-auto bg-white min-h-screen">
      <DetailPost />
      <RelatedPostList />
    </div>

  );
}