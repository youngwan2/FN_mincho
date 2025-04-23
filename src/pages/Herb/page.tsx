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
        search: '',
        month: '',
        sort:'asc',
        orderBy: '',
    })


    const {
        herbs,
        isFetchingNextPage,
        isError,
        isLoading,
        totalCount,
        fetchNextPage,
        hasNextPage,
    } = useHerbsGetQuery(9, searchCondition);

    // 정렬 조건 변경
    // sort: 'asc' | 'desc' (오름차순, 내림차순)
    // orderBy: 'bneNm' | 'cntntsSj' (학명, 한글 이름)
    const onSort=(sort:string, orderBy:string)=>{

        console.log(sort, orderBy)
        setSearchCondition(prev => ({
            ...prev,
            sort: sort,
            orderBy: orderBy
        }))
    }

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
        if (herbs.length <= 9 && totalCount <= herbs.length) {
            return
        } // 9 개 미만, 전체 약초 개수 이상 조회이면 더 이상 없다는 의미이므로 추가 페치 x
        if (hasNextPage && !isError) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView])

    return (

        <div className="h-auto">
            <SearchForm onSubmit={onSearchCondition} />
            <HerbBanner herbs={herbs} isLoading={isLoading} />
            {herbs.length < 1 && !isLoading && <div className="text-center text-2xl mt-10 py-10">검색된 약초가 없습니다.</div>}

            <HerbBody herbs={herbs} isLoading={isLoading} totalCount={totalCount} onSort={onSort} />
            {herbs.length < 1 && !isLoading && <div className="text-center text-2xl mt-10 py-10">검색된 약초가 없습니다.</div>}

            {/* 로딩체크 (임시) */}
            <button className={`border-primary-dark-gray text-primary-dark-gray mx-auto border py-2 px-4 rounded-[3px] flex justify-center mt-10 invisible`} ref={ref} />
            {
                isFetchingNextPage
                    ? <LoadingSpinner fixed={true} />
                    : null
            }
        </div>
    )
}