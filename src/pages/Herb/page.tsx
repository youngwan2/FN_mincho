import HerbBanner from "./components/HerbBanner";
import HerbBody from "./components/HerbBody";
import SearchForm from "./components/SearchForm";

export default function HerbPage() {

    return (

        <div className="h-auto">
            <SearchForm />
            <HerbBanner />
            <HerbBody />
        </div>
    )
}