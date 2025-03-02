import { FormEvent, useEffect, useState } from "react";
import { useHerbsGetQuery } from "../../hooks/queries/useQueryHerbs";
import { useInView } from 'react-intersection-observer'
import HerbBanner from "./components/HerbBanner";
import HerbBody from "./components/HerbBody";
import SearchForm from "./components/SearchForm";
import LoadingSpinner from "../../components/spinner/LoadingSpinner";
import { HerbSearchCondition } from "../../types/herb.types";


export default function HerbPage() {
    const { ref, inView } = useInView()

    const [searchCondition, setSearchCondition] = useState<HerbSearchCondition>({
        bneNm: '',
        month: '',
        orderBy: '',
    })


    const {
        herbs,
        isFetching,
        isFetchingNextPage,
        isError,
        fetchNextPage,
        hasNextPage,
    } = useHerbsGetQuery(9, searchCondition);


    // 필터 검색
    const onSearchCondition = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const bneNm = formData.get("bneNm")?.toString() ?? ''
        const month = formData.get("month")?.toString() ?? ''

        setSearchCondition(prev => ({
            ...prev,
            bneNm,
            month,
        }))

    }

    useEffect(() => {
        if (hasNextPage && !isError) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView])

    return (

        <div className="h-auto">
            <SearchForm onSubmit={onSearchCondition} />
            <HerbBanner herbs={herbs} />
            <HerbBody herbs={herbs} />

            {/* 로딩체크 (임시) */}
            <button className={`border-primary-dark-gray text-primary-dark-gray mx-auto border py-2 px-4 rounded-[3px] flex justify-center mt-10 invisible`} ref={ref} />
            {
                isFetching && isFetchingNextPage
                    ? <LoadingSpinner fixed={true} />
                    : null
            }
        </div>
    )
}