import Banner from "./components/Banner";
import PreviewHerbsSection from "./components/PreviewHerbsSection";
import MostViewSection from "./components/MostViewSection";
import HerbRecommendPreview from "./components/HerbRecommendPreview";

export default function HomePage() {

    return (
        <>
            <Banner />
            <MostViewSection />
            <PreviewHerbsSection />
            <HerbRecommendPreview />
            {/* <TipCardSection /> */}
        </>
    )
}
