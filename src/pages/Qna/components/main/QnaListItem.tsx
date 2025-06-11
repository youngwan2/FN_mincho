import { FiEye, FiMessageCircle } from 'react-icons/fi';
import { QnaSummary } from '@/types/qna.types';
import DOMPurify from 'dompurify';
import CustomTimeAgo from '@/components/vender/timeago/CustomTimeAgo';

interface QnaListItemProps {
    item: QnaSummary;
    onClick: (id: number) => void;
    onTagClick?: (tag: string) => void;
}

export default function QnaListItem({ item, onClick, onTagClick }: QnaListItemProps) {


    // 태그 클릭 핸들러 - 이벤트 버블링 중지 및 태그 필터링 실행
    const handleTagClick = (e: React.MouseEvent, tag: string) => {
        e.stopPropagation();
        if (onTagClick) {
            onTagClick(tag);
        }
    };

    return (
        <div
            className={`${item.hasAdoptedAnswer ? ' bg-green-50' : 'bg-white'}  rounded-3xl border hover:shadow-xs transition-shadow cursor-pointer relative p-8`}
            onClick={() => onClick(item.id)}
            role="article"
            aria-labelledby={`qna-title-${item.id}`}
            tabIndex={0}
            aria-describedby={`qna-content-${item.id} qna-meta-${item.id}`}
        >

            {/*  답변 채택 마크 */}
            {item.hasAdoptedAnswer && (
                <span
                    className="bg-gradient-to-tr from-green-500 from-15% to-green-700 text-white px-2 py-1 rounded-md text-2xl font-medium absolute -right-5 -top-5 shadow-[inset_-1px_-1px_3px_rgba(0,0,0,0.2)]"
                    aria-label="해결된 질문"
                >
                    <span>해결됨</span>
                </span>
            )}

            <div className="p-6">
                {/* 답변 여부 표시 */}
                <div className="flex items-start justify-between mb-4" role="status" aria-live="polite">
                    <div className="flex items-center gap-3">
                        {item.answers && item.answers.length > 0 && item.answers[0].id ? (
                            <div
                                className="bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-xl font-medium"
                                aria-label="답변이 있는 질문"
                            >
                                답변있음
                            </div>
                        ) : (
                            <div
                                className="bg-yellow-50 text-yellow-800 px-3 py-1.5 rounded-full text-xl font-medium"
                                aria-label="답변 대기중인 질문"
                            >
                                답변대기
                            </div>
                        )}
                        {item.isPrivate && (
                            <div
                                className="bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full text-xl font-medium"
                                aria-label="비공개 질문"
                            >
                                비공개
                            </div>
                        )}

                    </div>
                </div>

                <div className="mb-6">
                    <h3
                        id={`qna-title-${item.id}`}
                        className="text-3xl font-semibold text-gray-900 mb-2 hover:text-blue-600"
                    >
                        {item.title}
                    </h3>
                    <p
                        id={`qna-content-${item.id}`}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.content) }}
                        className="text-gray-600 mb-4 line-clamp-2"
                    />
                </div>

                {/* 태그 목록 */}
                {item.tags && item.tags.length > 0 && (
                    <ul
                        className="flex flex-wrap gap-2 mb-3"
                        aria-label="태그 목록"
                    >
                        {item.tags.map((tag, index) => (
                            <li
                                key={index}
                                className="bg-gradient-to-r from-[#e8f5e9] to-[#e3f2fd] text-gray-700 px-3 py-1 rounded-full text-xl flex items-center hover:shadow-sm transition-shadow border border-green-100 cursor-pointer"
                                onClick={(e) => handleTagClick(e, tag)}
                                aria-label={`태그: ${tag}`}
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        handleTagClick(e as unknown as React.MouseEvent, tag);
                                    }
                                }}
                            >
                                <span className="text-[#05D182] mr-1" aria-hidden="true">#</span>
                                {tag}
                            </li>
                        ))}
                    </ul>
                )}

                {/* 조회수/답변수 아이콘 */}
                <div
                    className="flex items-center justify-between text-2xl text-gray-500"
                    id={`qna-meta-${item.id}`}
                >
                    <div className="flex items-center gap-4">
                        <span aria-label={`작성자: ${item.writer}`}>{item.writer}</span>
                        <CustomTimeAgo date={item.createdAt} aria-label={`작성일: ${new Date(item.createdAt).toLocaleDateString()}`} />
                    </div>

                    <div className="flex items-center gap-4">
                        <div
                            className="flex items-center gap-1"
                            aria-label={`조회수: ${item.view || 0}회`}
                        >
                            <FiEye size={20} aria-hidden="true" />
                            <span className='text-2xl'>{item.view || 0}</span>
                        </div>
                        <div
                            className="flex items-center gap-1"
                            aria-label={`답변 수: ${item.answers && item.answers[0].id ? item.answers.length : 0}개`}
                        >
                            <FiMessageCircle size={20} aria-hidden="true" />
                            <span className='text-2xl'>{item.answers && item.answers[0].id ? item.answers.length : 0}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

