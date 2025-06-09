import { useParams } from "react-router";
import { useHerbDetailGetQuery } from "../../hooks/queries/useQueryHerbs";
import HerbDetailBanner from "./components/HerbDetailBanner";
import HerbDetailBody from "./components/HerbDetailBody";
import HerbDetailHeader from "./components/HerbDetailHeader";
import HerbDetailImages from "./components/HerbDetailImages";
import InteractionPanel from "./components/InteractionPanel";
import HerbDetailContents from "./components/HerbDetailContents";
import HerbDetailFooter from "./components/HerbDetailFooter";
import LoadingSpinner from "../../components/spinner/LoadingSpinner";
import { IoEye } from "react-icons/io5";
import HerbNotFoundCard from "../../components/card/HerbNotFoundCard";
import ShareModal from "../../components/modal/ShareModal";

export default function HerbDetailPage() {

    const { herbId } = useParams() ?? { herbId: 1 };
    const { herb, isLoading, isError } = useHerbDetailGetQuery(herbId ? Number(herbId) : 1)

    const bannerImage = (herb?.imgUrls ?? [])[0]
    const images = (herb?.imgUrls ? herb.imgUrls : [])


    return (
        <section className="min-h-[100vh] px-4 md:px-10 lg:px-12 pb-10">
            {
                isLoading
                    ? <div className="fixed left-0 top-0 w-full h-full">
                        <LoadingSpinner />

                    </div>
                    : isError ?
                        < HerbNotFoundCard message="서버 네트워크 문제로 데이터 조회에 실패하였습니다. 나중에 재시도 해주세요." />

                        : <>
                            <HerbDetailBanner image={bannerImage} />
                            <HerbDetailHeader herb={herb} />

                            <HerbDetailBody>
                                <HerbDetailImages images={images} />
                                <div className="flex items-center justify-between relative z-50 ">
                                    <InteractionPanel herb={herb} herbId={herbId} />
                                    <div className="flex">
                                        <span title="조회수" className="gap-2 text-3xl flex items-center mr-2"><IoEye />{herb?.viewCount || 0} </span>
                                        <ShareModal title={herb.cntntsSj} />
                                    </div>
                                </div>
                                <HerbDetailContents herb={herb} />
                            </HerbDetailBody>

                            <HerbDetailFooter herbId={Number(herbId)} />
                        </>
            }


        </section>
    )
}