export default function HerbRecommendHeader() {
    return (
        <div className="py-10">
            <h1 className="text-4xl font-bold py-2">추천 약초
                <div className="border-b-2 border-green-600 border-dashed pt-4"></div>
            </h1>

            <p className="mt-5 text-gray-800"> 증상이나 원하는 효능을 알려주시면, 적합한 약초와 활용법을 민초에서 보유하고 있는 약초정보를 기반으로 추천해드립니다.</p>
            <ul className=" rounded-md p-5 mt-8 text-gray-800">
                <li className="font-bold text-2xl mb-3 text-red-500">💬 주의사항 안내(필독)</li>
                <li className="text-gray-700" >① 추천된 약초 정보는 <a className="border-b border-green-400 hover:text-gray-700" href="https://www.nongsaro.go.kr/portal/ps/psz/psza/contentMain.ps?menuId=PS04103&pageUnit=8" target="_blank">농사로(https://www.nongsaro.go.kr/)</a> 민간약초 컨텐츠에 근거합니다.</li>
                <li className="text-gray-700" >② 사이트 운영자가 별도로 조사한 데이터 또한 DB에 관리되어 추천 서비스에 활용될 수 있습니다.</li>
                <li className="text-gray-700" >③ 앞서 ①, ②항을 고려하여 추천된 약초를 참고하시되, 정확한 복용 방법은 <mark className="bg-amber-100 px-2 rounded-md">전문가 상담</mark>이 필수입니다.</li>
            </ul>
        </div>
    )
}