import { useEffect, useState } from "react"



/**
 * 768px 기준으로 모바일인지 데스크톱인지 구분
 */
export default function useResize() {
    const [mobile, setMobile] = useState(false)


    function handleResize() {

        if (window.innerWidth <= 768) {

            setMobile(true)
        } else {
            setMobile(false)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [mobile])

    useEffect(() => {
        handleResize() // 초기 로드 시에도 한 번 실행
    }, [])

    return { mobile, setMobile }
}