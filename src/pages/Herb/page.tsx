import { FormEvent, useEffect, useState } from "react";
import { useHerbsGetQuery } from "../../hooks/queries/useQueryHerbs";
import { useInView } from 'react-intersection-observer';
import HerbBanner from "./components/main/HerbBanner";
import HerbBody from "./components/main/HerbBody";
import SearchForm from "./components/main/SearchForm";
import LoadingSpinner from "../../components/spinner/LoadingSpinner";
import { HerbSearchCondition } from "../../types/herb.types";
import HerbHeader from "./components/main/HerbHeader";
import HerbSort from "./components/main/HerbSort";

export default function HerbPage() {
    const { ref, inView } = useInView()

    const [searchCondition, setSearchCondition] = useState<HerbSearchCondition>({
        bneNm: '',
        search: '',
        month: '',
        sort: 'asc',
        orderBy: '',
        cntntsSj: ''
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

    // 정렬
    const onSort = (sort: string, orderBy: string) => {
        setSearchCondition(prev => ({
            ...prev,
            sort: sort,
            orderBy: orderBy,
        }))
    }

    // 필터 검색
    const onSearchCondition = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const bneNm = formData.get("bneNm")?.toString() ?? ''
        const month = formData.get("month")?.toString() ?? ''
        const keyword = formData.get("keyword")?.toString() ?? ''

        setSearchCondition(prev => ({
            ...prev,
            bneNm,
            month,
            cntntsSj: keyword
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
        <section className="min-h-1/3 w-full px-4 md:px-10 lg:px-12 pb-10 animate-fade-down">
            <div className="mx-auto py-6">
                {/* 헤더 */}
                <HerbHeader sort={<HerbSort onSort={onSort} selectedSort={searchCondition.sort} />} />

                {/* 검색 폼 */}
                <div className="mt-8 animate-fade-up animate-delay-100">
                    <SearchForm onSubmit={onSearchCondition} />
                </div>

                {/* 배너 */}
                <div className="mt-8 animate-fade-up animate-delay-200">
                    <HerbBanner herbs={herbs} isLoading={isLoading} />
                </div>

                {herbs.length < 1 && !isLoading && (
                    <div className="text-center text-2xl mt-10 py-10 animate-fade">검색된 약초가 없습니다.</div>
                )}

                {/* 본문 */}
                <div className="mt-12 animate-fade-up animate-delay-300">
                    <HerbBody
                        herbs={herbs}
                        isLoading={isLoading}
                        totalCount={totalCount}
                    />
                </div>

                {/* 로딩체크 (임시) */}
                <button className={`border-primary-dark-gray text-primary-dark-gray mx-auto border py-2 px-4 rounded-[3px] flex justify-center mt-10 invisible`} ref={ref} />
                {isFetchingNextPage && !(herbs.length <= 9) && <LoadingSpinner fixed={true} />}
            </div>
        </section>
    )
}