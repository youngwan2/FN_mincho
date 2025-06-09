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
            className="bg-white rounded-3xl border hover:shadow-xs transition-shadow cursor-pointer"
            onClick={() => onClick(item.id)}
        >
            <div className="p-6">
                {/* 답변 여부 표시 */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                        {item.answers && item.answers.length > 0 && item.answers[0].id ? (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xl font-medium">
                                답변완료
                            </span>
                        ) : (
                            <span className="bg-yellow-50 text-yellow-800 px-2 py-1 rounded-full text-xl font-medium">
                                답변대기
                            </span>
                        )}
                        {item.isPrivate && (
                            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xl font-medium">
                                비공개
                            </span>
                        )}
                    </div>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-2 hover:text-blue-600">
                    {item.title}
                </h3>
                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.content) }} className="text-gray-600 mb-4 line-clamp-2" />

                {/* 태그 목록 */}
                {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {item.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="bg-gradient-to-r from-[#e8f5e9] to-[#e3f2fd] text-gray-700 px-3 py-1 rounded-full text-xl flex items-center hover:shadow-sm transition-shadow border border-green-100 cursor-pointer"
                                onClick={(e) => handleTagClick(e, tag)}
                            >
                                <span className="text-[#05D182] mr-1">#</span>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* 조회수/답변수 아이콘 */}
                <div className="flex items-center justify-between text-2xl text-gray-500">
                    <div className="flex items-center gap-4">
                        <span>{item.writer}</span>
                        <CustomTimeAgo date={item.createdAt} />
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <FiEye size={20} />
                            <span className='text-2xl'>{item.view || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <FiMessageCircle size={20} />
                            <span className='text-2xl'>{item.answers && item.answers[0].id ? item.answers.length : 0}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

