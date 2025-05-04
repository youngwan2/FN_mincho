import Banner from "./components/Banner";
import PreviewHerbsSection from "./components/PreviewHerbsSection";
import MostViewSection from "./components/MostViewSection";
// import TipCardSection from "./components/TipCardSection";

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
