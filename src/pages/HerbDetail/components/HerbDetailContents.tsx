import React from "react"
import { HerbDetail } from "../../../types/herb.types"
import HerbNotFoundCard from "../../../components/card/HerbNotFoundCard"

interface HerbDetailContentsProps {

    herb: HerbDetail
}

export default function HerbDetailContents({ herb }: HerbDetailContentsProps) {

    if(!herb || !herb.prvateTherpy){
        return <HerbNotFoundCard/>
    }
    return (
        <div className="w-full h-auto mt-8">
            <div className="mt-5">
                <p className=" text-[16px] flex flex-col items-start">
                    <strong>
                        사용부위
                    </strong>

                    {herb.useeRegn}
                </p>
                <p className=" text-[16px] flex flex-col items-start  mt-3">
                    <strong>
                        민간용법
                    </strong>
                    {
                        herb.prvateTherpy.split('<br />').map((line, index) => (
                            <React.Fragment key={index}>
                                {line.trim()}
                                {index !== herb.prvateTherpy.split('<br />').length - 1 && <br />}
                            </React.Fragment>
                        ))
                    }
                </p>
                <p className=" text-[16px] flex flex-col items-start  mt-3">
                    <strong>
                        형태
                    </strong>
                    {
                        herb.stle.split('<br />').map((line, index) => (
                            <React.Fragment key={index}>
                                {line.trim()}
                                {index !== herb.stle.split('<br />').length - 1 && <br />}
                            </React.Fragment>
                        ))
                    }
                </p>
            </div>
        </div>

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