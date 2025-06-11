import React from "react"
import HerbDetailSubTitle from "./HerbDetailSubTitle"
import { HerbDetail } from "@/types/herb.types"
import HerbNotFoundCard from "@/components/card/HerbNotFoundCard"

interface HerbDetailContentsProps {

    herb: HerbDetail
}

/** 해당 컨텐츠는 추가 시 관리자가 글을 작성하며, 포맷을 강제하여 따르게 처리 */
export default function HerbDetailContents({ herb }: HerbDetailContentsProps) {

    if (!herb || !herb.prvateTherpy) {
        return <HerbNotFoundCard message="데이터 조회에 실패하였습니다. 나중에 재시도 해주세요." />
    }
    return (
        <div className="w-full h-auto mt-10 text-[#333] ">
            <hr className="border-primary-gray" />
            <div className="mt-12">
                <p className=" text-[16px] flex flex-col items-start">
                    <HerbDetailSubTitle>
                        사용부위
                    </HerbDetailSubTitle>
                    {herb.useeRegn}
                </p>

                <p className=" text-[16px] flex flex-col items-start  mt-8">
                    <HerbDetailSubTitle>
                        민간용법
                    </HerbDetailSubTitle>
                    {
                        herb.prvateTherpy
                            .replaceAll("참고 :", "(참고)")
                            .replaceAll("주의 :", "(주의)")
                            .replaceAll("□", "■")
                            .split(/<br\s*\/?>|- /) // <br />나 - 로 split
                            .map((line, index) => (
                                <React.Fragment key={index}>
                                    {line.trim()}
                                    <br />
                                </React.Fragment>
                            ))
                    }

                </p>

                <p className=" text-[16px] flex flex-col items-start  mt-8">
                    <HerbDetailSubTitle>
                        생장 형태
                    </HerbDetailSubTitle>
                    {
                        herb.growthForm.replaceAll("□", "■").split('<br />').map((line, index) => (
                            <React.Fragment key={index}>
                                {line.trim()}
                                {index !== herb.growthForm.split('<br />').length - 1 && <br />}
                            </React.Fragment>
                        ))
                    }
                </p>
                <p className=" text-[16px] flex flex-col items-start  mt-8">
                    <HerbDetailSubTitle>
                        개화기
                    </HerbDetailSubTitle>
                    {
                        herb.flowering.split('<br />').map((line, index) => (
                            <React.Fragment key={index}>
                                {line.trim()}
                                {index !== herb.flowering.split('<br />').length - 1 && <br />}
                            </React.Fragment>
                        ))
                    }
                </p>
                <p className=" text-[16px] flex flex-col items-start  mt-8">
                    <HerbDetailSubTitle>
                        재배환경
                    </HerbDetailSubTitle>
                    {
                        herb.habitat.split('<br />').map((line, index) => (
                            <React.Fragment key={index}>
                                {line.trim()}
                                {index !== herb.habitat.split('<br />').length - 1 && <br />}
                            </React.Fragment>
                        ))
                    }
                </p>
                <p className=" text-[16px] flex flex-col items-start  mt-8">
                    <HerbDetailSubTitle>
                        수확 및 건조
                    </HerbDetailSubTitle>
                    {
                        herb.harvest.split('<br />').map((line, index) => (
                            <React.Fragment key={index}>
                                {line.trim()}
                                {index !== herb.harvest.split('<br />').length - 1 && <br />}
                            </React.Fragment>
                        ))
                    }
                </p>
            </div>
        </div >

    )
}

/**
 *   private Long id;
    private String cntntsNo; // 콘텐츠 번호
    private String bneNm; // 학명
    private String cntntsSj; // 제목
    private String hbdcNm; // 한방명
    private List<String> imgUrls; // 이미지 URL 배열
    private String prvateTherpy; // 민간요법
    private String stle; // 형태
    private String useeRegn; // 이용 부위
 * 
 * 
 * 
 * 
 */