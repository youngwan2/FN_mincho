import { useEffect } from "react";
import { useHerbsGetQuery } from "../../hooks/queries/useQueryHerbs";
import { useInView } from 'react-intersection-observer'
import HerbBanner from "./components/HerbBanner";
import HerbBody from "./components/HerbBody";
import SearchForm from "./components/SearchForm";


export default function HerbPage() {


    const { ref, inView } = useInView()
    const {
        status,
        herbs,
        error,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useHerbsGetQuery(9);

    useEffect(() => {
        fetchNextPage();
    }, [fetchNextPage, inView])

    return (

        <div className="h-auto">
            <SearchForm />
            <HerbBanner herbs={herbs} />
            <HerbBody herbs={herbs} />

            {/* 로딩체크 (임시) */}
            <button className="mx-auto " ref={ref}>
                {isFetchingNextPage
                    ? '가져오는 중...'
                    : hasNextPage
                        ? '더보기'
                        : '마지막'}

            </button>
            <div>
                {isFetching && !isFetchingNextPage
                    ? '가져오는 중...'
                    : null}
            </div>
        </div>
    )
}