import DetailPost from "./components/DetailPost";
import RelatedPostList from "./components/RelatedPostList";

export default function CommunityDetailPage() {

  return (

    <div className="w-full mx-auto bg-white min-h-screen">
      <DetailPost />
      <RelatedPostList />
    </div>

  );
}