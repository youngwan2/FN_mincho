import { useParams } from "react-router";
import { useHerbDetailGetQuery } from "../../hooks/querires/useQueryHerbs";
import HerbDetailBanner from "./components/HerbDetailBanner";
import HerbDetailBody from "./components/HerbDetailBody";
import HerbDetailHeader from "./components/HerbDetailHeader";
import HerbDetailImages from "./components/HerbDetailImages";
import InteractionPanel from "./components/InteractionPanel";
import HerbDetailContents from "./components/HerbDetailContents";
import HerbDetailFooter from "./components/HerbDetailFooter";


/**TODO: 데이터 상태에 따라 분기처리 해야 함 */
export default function HerbDetailPage() {

    const { herbId } = useParams() ?? { herbId: 1 };
    const { herb, isError, isLoading, status } = useHerbDetailGetQuery(herbId ? Number(herbId) : 1)

    const bannerImage = (herb?.imgUrls ?? [])[0]
    const images = (herb?.imgUrls ? herb.imgUrls : [])

    return (
        <section>
            <HerbDetailBanner image={bannerImage} />
            <HerbDetailHeader herb={herb} />

            <HerbDetailBody>
                <HerbDetailImages images={images} />
                <InteractionPanel />
                <HerbDetailContents herb={herb} />
            </HerbDetailBody>
            <HerbDetailFooter herbId={Number(herbId)} />
        </section>
    )
}