import { FiEye, FiMessageCircle } from 'react-icons/fi';
import { QnaSummary } from '@/types/qna.types';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

interface QnaListItemProps {
    item: QnaSummary;
    onClick: (id: number) => void;
}

export default function QnaListItem({ item, onClick }: QnaListItemProps) {
    // 날짜 포맷팅 함수
    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        try {
            return format(parseISO(dateString), 'yyyy.MM.dd', { locale: ko });
        } catch (error) {
            return dateString;
        }
    };

    return (
        <div
            className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
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

                <p className="text-gray-600 mb-4 line-clamp-2">
                    {item.content}
                </p>

                <div className="flex items-center justify-between text-xl text-gray-500">
                    <div className="flex items-center gap-4">
                        <span>{item.writer}</span>
                        <span>{formatDate(item.createdAt)}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <FiEye size={16} />
                            <span>{item.view || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <FiMessageCircle size={16} />
                            <span>{item.answers && item.answers[0].id ? item.answers.length : 0}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

