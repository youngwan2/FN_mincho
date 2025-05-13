import Banner from "./components/Banner";
import PreviewHerbsSection from "./components/PreviewHerbsSection";
import MostViewSection from "./components/MostViewSection";

export default function HomePage() {

    return (
        <>
            <Banner />
            <MostViewSection />
            <PreviewHerbsSection />
            {/* <TipCardSection /> */}
        </>
    )
}
