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


/**TODO: 데이터 상태에 따라 분기처리 해야 함 */
export default function HerbDetailPage() {

    const { herbId } = useParams() ?? { herbId: 1 };
    console.log("herbId:"+herbId)
    const { herb, isError, isLoading } = useHerbDetailGetQuery(herbId ? Number(herbId) : 1)

    const bannerImage = (herb?.imgUrls ?? [])[0]
    const images = (herb?.imgUrls ? herb.imgUrls : [])

    return (
        <section>
            {
                isLoading
                    ? <div className="fixed left-0 top-0 w-full h-full">
                        <LoadingSpinner />

                    </div>
                    : null
            }
            <HerbDetailBanner image={bannerImage} />
            <HerbDetailHeader herb={herb} />

            <HerbDetailBody>
                <HerbDetailImages images={images} />
                <InteractionPanel herb={herb} herbId={herbId} />
                <HerbDetailContents herb={herb} />
            </HerbDetailBody>
            
            <HerbDetailFooter herbId={Number(herbId)} />
        </section>
    )
}