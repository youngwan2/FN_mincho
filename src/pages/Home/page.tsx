import Banner from "./components/Banner";
import BloomingHerbsSection from "./components/BloomingHerbsSection";
import MostViewSection from "./components/MostViewSection";
import TipCardSection from "./components/TipCardSection";

export default function HomePage() {

    return (
        <>
            <Banner />
            <MostViewSection />
            <BloomingHerbsSection />
            <TipCardSection />
        </>
    )
}
