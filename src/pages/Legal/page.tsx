import { legalDocuments } from '@/config/legal';
import { useEffect, useState } from 'react';
import { FiFileText, FiChevronRight } from 'react-icons/fi';
import { useLocation } from 'react-router';

// 해시값을 문서 ID로 매핑하는 객체
const hashToDocId = {
    'terms': 'terms-of-service',
    'privacy': 'privacy-policy',
    'privacyCon': 'privacy-consent',
    'marketing': 'marketing-consent',
    'youth': 'youth-policy',
    'notice': 'legal-notice'
};

export default function LegalPage() {
    const location = useLocation();
    const [selectedDoc, setSelectedDoc] = useState<string | null>(null); // 현재 선택된 문서 ID

    // URL 해시가 변경되면 해당하는 문서를 선택
    useEffect(() => {
        const hash = location.hash.replace('#', ''); // 주소가 #terms, #privacy 등으로 되어있으므로 해시에서 # 제거
        const docId = hashToDocId[hash as keyof typeof hashToDocId]; // 해시를 문서 ID로 변환

        if (docId) {
            setSelectedDoc(docId);
        } else if (!selectedDoc) {
            // 기본 문서 선택 (해시가 없거나 일치하는 문서가 없을 경우)
            setSelectedDoc('privacy-policy');
        }
    }, [location.hash]);

    // 선택한 문서 찾기
    const currentDoc = legalDocuments.find(doc => doc.id === selectedDoc) || legalDocuments[0];

    return (
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">법적 문서 및 정책</h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* 문서 목록 사이드바 */}
                <div className="w-full md:w-1/3 bg-white rounded-lg shadow-sm p-5">
                    <h2 className="text-2xl font-semibold mb-4">구비서류 목록</h2>
                    <nav className="space-y-2" aria-label="구비서류 내비게이션">
                        {legalDocuments.map((doc) => (
                            <button
                                key={doc.id}
                                className={`w-full flex items-center p-3 rounded-md text-left ${(selectedDoc === doc.id || (!selectedDoc && doc.id === 'privacy-policy'))
                                    ? 'bg-green-50 text-[#05D182]'
                                    : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                onClick={() => setSelectedDoc(doc.id)}
                                aria-current={(selectedDoc === doc.id || (!selectedDoc && doc.id === 'privacy-policy')) ? 'page' : undefined}
                            >
                                <FiFileText className="mr-3" />
                                <span>{doc.title}</span>
                                {(selectedDoc === doc.id || (!selectedDoc && doc.id === 'privacy-policy')) && (
                                    <FiChevronRight className="ml-auto" />
                                )}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* 문서 내용 표시 영역 */}
                <div className="w-full md:w-2/3 bg-white rounded-lg shadow-sm">
                    <div className="p-5 border-b">
                        <h2 className="text-2xl font-semibold text-gray-900">{currentDoc.title}</h2>
                        <p className="text-gray-500 mt-1">{currentDoc.description}</p>
                    </div>

                    <div className="h-[800px] overflow-y-auto">
                        <iframe
                            src={currentDoc.path}
                            title={currentDoc.title}
                            className="w-full h-full border-0"
                            aria-label={`${currentDoc.title} 문서 내용`}
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}
