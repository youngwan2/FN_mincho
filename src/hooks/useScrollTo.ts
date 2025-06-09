import { useEffect } from "react"

export default function useScrollTo() {

    useEffect(() => {
        // 페이지가 로드될 때 스크롤을 최상단으로 이동
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])
}